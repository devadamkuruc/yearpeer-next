"use client"
import * as React from 'react';
import {Calendar} from "@/components/ui/calendar";
import {DateRange} from "react-day-picker";
import {useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import CreateGoalForm from "@/app/ui/calendar/goals/create-form";
import {format} from "date-fns";

export function YearView() {
    const [date, setDate] = useState<DateRange | undefined>();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDateSelect = (selectedDate: DateRange | undefined) => {
        setDate(selectedDate);

        // Only open dialog if a complete range is selected (with from and to)
        if (selectedDate?.from && selectedDate?.to) {
            setDialogOpen(true);
        }
    };

    // Handle dialog close
    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            // Clear the date selection when the dialog is closed
            setDate(undefined);
        }
    };

    // Handle keyboard events through onKeyDown on the container
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' && date && !dialogOpen) {
            setDate(undefined);
        }
    };

    return (
        <>
            <div
                className="grid grid-cols-4 gap-4 outline-none"
                onKeyDown={handleKeyDown}
                tabIndex={0} // Make div focusable to capture keyboard events
            >
                {Array.from({length: 12}).map((_, index) => {
                    const month = new Date(new Date().getFullYear(), index);

                    return (
                        <div key={index} className="border rounded-md p-2">
                            <div className="text-center font-medium mb-2">
                                {format(month, "MMMM")}
                            </div>
                            <Calendar
                                initialFocus
                                dir="ltr"
                                disableNavigation
                                ISOWeek
                                mode="range"
                                selected={date}
                                onSelect={handleDateSelect}
                                month={month}
                                defaultMonth={month}
                                showOutsideDays
                                className="w-full"
                            />
                        </div>
                    );
                })}
            </div>

            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <CreateGoalForm dateRange={date}/>
                </DialogContent>
            </Dialog>
        </>
    );
}