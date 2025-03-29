interface YearPickerProps {
    year: string;
}

export default function YearPicker({year}: YearPickerProps) {
    return (
        <div>
            {year}
        </div>
    );
};