import {ImpactLevel} from "@prisma/client";

export type CalendarView = 'year' | 'month';

export interface DateRange {
    start: Date | null;
    end: Date | null;
}


export interface Goal {
    id: string;
    userId: string;
    title: string;
    description?: string | null;
    startDate: Date | string;
    endDate: Date | string;
    color: string;
    impact: ImpactLevel;
    createdAt: Date | string;
    updatedAt: Date | string;
}
