
import YearView from "@/app/ui/calendar/year-view";
import {getGoalsByYear} from "@/lib/data";

export default async function Page({ params}: {
    params: Promise<{ year: string }>
}) {
    const {year} = await params;
    const intYear = parseInt(year);
    const goals = await getGoalsByYear(intYear);

    return (
        <div>
            <YearView goals={goals} />
        </div>
    );
}