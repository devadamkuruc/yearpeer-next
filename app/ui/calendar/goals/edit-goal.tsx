import {
    Dialog, DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { Pencil} from "lucide-react";
import {Goal} from "@/lib/definitions";
import EditGoalForm from "@/app/ui/calendar/goals/edit-form";

interface EditGoalProps {
    goal: Goal;
}

export default function EditGoal({ goal }: EditGoalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil height={12} width={12}
                    className="opacity-0 group-hover/goal-item:opacity-80 transition-opacity"
                    />
            </DialogTrigger>
            <DialogContent>
                <EditGoalForm goal={goal} />
            </DialogContent>
        </Dialog>
    );
};