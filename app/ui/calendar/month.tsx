"use client"

import { Goal} from "@/lib/definitions";
import {useMemo, useState} from "react";
import {format, getDaysInMonth, isSameMonth, startOfMonth} from "date-fns";
import CalendarDay from "@/app/ui/calendar/day";
import {DateRange} from "react-day-picker";

export default function CalendarMonth({ month, goals, onDateRangeSelect }: {
    month: Date;
    goals: Goal[];
    onDateRangeSelect: (range: DateRange) => void;
}) {
    const [selectionStart, setSelectionStart] = useState<Date | null>(null);
    const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

    // Create a map of dates to goals for efficient lookup
    const goalDatesMap = useMemo(() => {
        const map = new Map<string, Goal>();

        goals.forEach(goal => {
            const startDate = new Date(goal.startDate);
            const endDate = new Date(goal.endDate);

            const current = new Date(startDate);
            while (current <= endDate) {
                const dateKey = format(current, 'yyyy-MM-dd');
                map.set(dateKey, goal);
                current.setDate(current.getDate() + 1);
            }
        });

        return map;
    }, [goals]);

    // Generate calendar days
    const calendarDays = useMemo(() => {
        const daysInMonth = getDaysInMonth(month);
        const monthStart = startOfMonth(month);
        const dayOfWeek = monthStart.getDay();

        // Generate array of days (including adjacent month days for proper grid)
        const days = [];

        // Add days from previous month to fill first week
        const prevMonthDays = dayOfWeek;
        for (let i = prevMonthDays - 1; i >= 0; i--) {
            const day = new Date(monthStart);
            day.setDate(day.getDate() - i);
            days.push(day);
        }

        // Add days of current month
        for (let i = 0; i < daysInMonth; i++) {
            const day = new Date(monthStart);
            day.setDate(day.getDate() + i);
            days.push(day);
        }

        // Add days from next month to fill last row
        const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
        for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(monthStart);
            day.setDate(daysInMonth + i);
            days.push(day);
        }

        return days;
    }, [month]);

    // Handle day selection
    const handleDaySelect = (day: Date) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        const goal = goalDatesMap.get(dateKey);

        // If the day has a goal, the dialog is handled by the CalendarDay component
        if (goal) return;

        // Handle date range selection
        if (!selectionStart) {
            // Start a new selection
            setSelectionStart(day);
            setHoveredDay(day);
        } else {
            // Complete the selection
            const startDate = selectionStart < day ? selectionStart : day;
            const endDate = selectionStart < day ? day : selectionStart;

            onDateRangeSelect({ from: startDate, to: endDate });

            // Reset selection
            setSelectionStart(null);
            setHoveredDay(null);
        }
    };

    // Handle mouse hover for visualizing range selection
    const handleDayHover = (day: Date) => {
        if (selectionStart) {
            setHoveredDay(day);
        }
    };

    // Determine if a day is in the current selection range
    const isDayInRange = (day: Date) => {
        if (!selectionStart || !hoveredDay) return false;

        const start = selectionStart < hoveredDay ? selectionStart : hoveredDay;
        const end = selectionStart < hoveredDay ? hoveredDay : selectionStart;

        return day >= start && day <= end;
    };

    // Get goal for a specific date
    const getGoalForDay = (day: Date) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        return goalDatesMap.get(dateKey);
    };

    return (
        <div className="rounded-xl pb-2 bg-white flex flex-col h-full">
            <div className="flex justify-center items-center gap-2 font-bold rounded-t-xl py-2 text-center bg-black text-white cursor-pointer">
                {format(month, 'MMMM')}
            </div>

            <div className="px-2 grid grid-cols-7 gap-1 divide-black/2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day}
                         className="text-center text-xs font-medium text-gray-500 py-1 border-b border-black/2">
                        {day}
                    </div>
                ))}
            </div>

            <div
                className="grid grid-cols-7 gap-1 flex-1 mx-3"
                onMouseLeave={() => setHoveredDay(selectionStart)}
            >
                {calendarDays.map((day, i) => {
                    const dayGoal = getGoalForDay(day);
                    const isInRange = isDayInRange(day) && !dayGoal && isSameMonth(day, month);

                    return (
                        <div
                            key={i}
                            className={`rounded-md ${isInRange && 'bg-gray-200'} ${day.toDateString() === selectionStart?.toDateString() && 'bg-gray-300'} flex justify-center`}
                            onMouseEnter={() => handleDayHover(day)}
                        >
                            <CalendarDay
                                day={day}
                                goal={dayGoal}
                                month={month}
                                onSelect={handleDaySelect}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

