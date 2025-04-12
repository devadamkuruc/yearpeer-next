"use client"

import {Goal} from "@/lib/definitions";
import {useState} from "react";
import {DateRange} from "react-day-picker";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import CreateGoalForm from "@/app/ui/calendar/goals/create-form";
import * as React from "react";
import CalendarMonth from "@/app/ui/calendar/month";

interface YearViewProps {
    goals: Goal[]
}

export default function YearView({ goals }: YearViewProps) {
    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDateRangeSelect = (range: DateRange) => {
        setSelectedRange(range);
        setIsDialogOpen(true);
    };

    const handleDialogClose = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            // Clear selection when dialog closes
            setSelectedRange(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => {
                    const month = new Date(new Date().getFullYear(), index);
                    return (
                        <CalendarMonth
                            key={index}
                            month={month}
                            goals={goals}
                            onDateRangeSelect={handleDateRangeSelect}
                        />
                    );
                })}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent>
                    {selectedRange && (
                        <CreateGoalForm dateRange={selectedRange} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}