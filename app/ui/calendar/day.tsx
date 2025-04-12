"use client"

import * as React from 'react';
import {Goal} from "@/lib/definitions";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import EditGoalForm from "@/app/ui/calendar/goals/edit-form";
import {isSameMonth} from "date-fns";

export default function CalendarDay({day, goal, month, onSelect}: {
    day: Date;
    goal?: Goal;
    month: Date;
    onSelect: (day: Date) => void;
}) {
    const isCurrentMonth = isSameMonth(day, month);
    const dayNumber = day.getDate();

    const handleClick = () => {
        if (isCurrentMonth) {
            onSelect(day);
        }
    };

    return (
        <div
            className={`relative w-full h-6  flex items-center justify-center text-xs cursor-pointer rounded-md ${isCurrentMonth ? '' : 'text-gray-400'} ${goal ? '' : 'hover:bg-gray-100'}`}
            onClick={handleClick}
            style={goal ? {backgroundColor: goal.color, opacity: 0.8, color: '#000'} : {}}
        >
            {goal ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-full h-full flex items-center justify-center">
                            {dayNumber}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <EditGoalForm goal={goal}/>
                    </DialogContent>
                </Dialog>
            ) : (
                dayNumber
            )}
        </div>
    );
}

