import {getGoalsByYear} from "@/lib/data";
import CreateGoal from "@/app/ui/calendar/goals/create-goal";
import EditGoal from "@/app/ui/calendar/goals/edit-goal";

interface GoalsProps {
    year: string;
}

export default async function Goals({year}: GoalsProps) {
    const intYear = parseInt(year);
    const goals = await getGoalsByYear(intYear);

    return (

        <div className="flex flex-col mt-7">
            <div className="text-white text-2xl font-extrabold mb-3">
                Goals for {year}
            </div>

            <div className="flex flex-col gap-y-1">
                {goals.length ? goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="flex items-center text-white cursor-pointer hover:bg-white/10 rounded-lg py-1 px-2 transition-colors group/goal-item"
                    >
                        <div className="flex items-center flex-1 min-w-0">
                            <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{backgroundColor: goal.color}}
                            />
                            <span className="ml-2 text-sm truncate">{goal.title}</span>
                        </div>

                        <EditGoal goal={goal} />
                    </div>
                )) : (
                    <div className="text-white/80 text-sm">No goals planned</div>
                )}

                <CreateGoal/>
            </div>
        </div>

    );
};