import dayjs from "dayjs";


export const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year();
    const firstDayOfMonth = dayjs().set("month", month).startOf("month").day();

    let dayCounter = -firstDayOfMonth;

    return Array.from({ length: 5 }, () =>

        Array.from({ length: 7 }, () => dayjs(new Date(year, month, ++dayCounter)))
    )
}

export const getFullYear = (year = dayjs().year()) => {
    // Create a 3x4 grid (3 rows, 4 columns) to display all 12 months
    return Array.from({ length: 3 }, (_, rowIndex) =>
        Array.from({ length: 4 }, (_, colIndex) => {
            const month = rowIndex * 4 + colIndex; // Calculate month (0-11)

            // For each month, generate its calendar grid (5 rows x 7 columns)
            const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
            let dayCounter = -firstDayOfMonth;

            // Generate the calendar for this month (5 rows x 7 cols)
            const monthCalendar = Array.from({ length: 5 }, () =>
                Array.from({ length: 7 }, () =>
                    dayjs(new Date(year, month, ++dayCounter))
                )
            );

            return {
                month,
                monthName: dayjs(new Date(year, month, 1)).format('MMMM'),
                days: monthCalendar
            };
        })
    );
};