"use client"
import * as React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateGoalForm from "@/app/ui/calendar/goals/create-form";
import { Goal } from "@/lib/definitions";
import { format, isSameMonth } from "date-fns";

interface YearViewProps {
    goals: Goal[]
}

export default function YearView({ goals }: YearViewProps) {
    // Instead of a single date state, we'll use an array of 12 date states for each month
    const [monthDates, setMonthDates] = useState<(DateRange | undefined)[]>(Array(12).fill(undefined));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeMonth, setActiveMonth] = useState<number | null>(null);

    // Create a dates-to-goal mapping for efficient lookup
    const goalDatesMap = useMemo(() => {
        const map = new Map<string, Goal>();

        goals.forEach(goal => {
            const startDate = new Date(goal.startDate);
            const endDate = new Date(goal.endDate);

            // Add all dates between start and end to this goal's dates
            const current = new Date(startDate);
            while (current <= endDate) {
                const dateKey = format(current, 'yyyy-MM-dd');
                map.set(dateKey, goal);
                current.setDate(current.getDate() + 1);
            }
        });

        return map;
    }, [goals]);

    // Handle date selection for a specific month
    const handleDateSelect = (monthIndex: number) => (selectedDate: DateRange | undefined) => {
        const newMonthDates = [...monthDates];
        newMonthDates[monthIndex] = selectedDate;
        setMonthDates(newMonthDates);

        // Only open dialog if a complete range is selected (with from and to)
        if (selectedDate?.from && selectedDate?.to) {
            setActiveMonth(monthIndex);
            setDialogOpen(true);
        }
    };

    // Handle dialog close
    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            // Clear only the active month's selection when the dialog is closed
            if (activeMonth !== null) {
                const newMonthDates = [...monthDates];
                newMonthDates[activeMonth] = undefined;
                setMonthDates(newMonthDates);
                setActiveMonth(null);
            }
        }
    };

    // Handle keyboard events through onKeyDown on the container
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' && !dialogOpen && activeMonth !== null) {
            const newMonthDates = [...monthDates];
            newMonthDates[activeMonth] = undefined;
            setMonthDates(newMonthDates);
            setActiveMonth(null);
        }
    };

    // Create modifiers for goals that check if the day is in the current month
    const createModifiers = (month: Date) => {
        const modifiers: Record<string, (date: Date) => boolean> = {};

        goals.forEach(goal => {
            const goalId = goal.id;
            const modKey = `goal-${goalId}`;

            modifiers[modKey] = (date: Date) => {
                // Only apply to days in the current month
                if (!isSameMonth(date, month)) {
                    return false;
                }

                // Check if this date is part of the goal
                const dateKey = format(date, 'yyyy-MM-dd');
                const mappedGoal = goalDatesMap.get(dateKey);
                return Boolean(mappedGoal && mappedGoal.id === goal.id);
            };
        });

        return modifiers;
    };

    // Create styles for goal modifiers
    const createModifierStyles = () => {
        const styles: Record<string, React.CSSProperties> = {};

        goals.forEach(goal => {
            const goalId = goal.id;
            const modKey = `goal-${goalId}`;

            styles[modKey] = {
                backgroundColor: goal.color,
                color: '#000',
                opacity: 0.8,
                borderRadius: '4px'
            };
        });

        return styles;
    };

    return (
        <>
            <div
                className="grid grid-cols-4 gap-4 outline-none"
                onKeyDown={handleKeyDown}
                tabIndex={0} // Make div focusable to capture keyboard events
            >
                {Array.from({ length: 12 }).map((_, index) => {
                    const month = new Date(new Date().getFullYear(), index);
                    const monthModifiers = createModifiers(month);
                    const modifierStyles = createModifierStyles();

                    return (
                        <div key={index} className="border rounded-md">
                            <Calendar
                                initialFocus
                                dir="ltr"
                                disableNavigation
                                ISOWeek
                                mode="range"
                                selected={monthDates[index]}
                                onSelect={handleDateSelect(index)}
                                month={month}
                                defaultMonth={month}
                                showOutsideDays
                                className="w-full"
                                modifiers={monthModifiers}
                                modifiersStyles={modifierStyles}
                                disabled={[
                                    { before: new Date(month.getFullYear(), month.getMonth(), 1) },
                                    { after: new Date(month.getFullYear(), month.getMonth() + 1, 0) }
                                ]}
                            />
                        </div>
                    );
                })}
            </div>

            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent>
                    {activeMonth !== null && (
                        <CreateGoalForm dateRange={monthDates[activeMonth]} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}