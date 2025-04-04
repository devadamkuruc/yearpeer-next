import Link from "next/link";
import React from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface YearPickerProps {
    year: string;
}

export default function YearPicker({year}: YearPickerProps) {
    const intYear = parseInt(year);
    return (
        <div className="flex items-center justify-center bg-white rounded-lg border border-black/20">
            <Link
                href={`/calendar/${intYear - 1}`}
                className="bg-transparent border-none flex items-center hover:bg-transparent text-xs"
                aria-label="Previous year"
            >
                <ChevronLeft className="text-black h-4"/>
            </Link>
            <span className="py-1 px-2">{year}</span>
            <Link
                href={`/calendar/${intYear + 1}`}
                className="bg-transparent border-none flex items-center hover:bg-transparent text-xs"
                aria-label="Next year"
            >
                <ChevronRight className="text-black h-4"/>
            </Link>
        </div>
    );
};