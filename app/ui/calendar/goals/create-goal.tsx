import {
    Dialog, DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import CreateGoalForm from "@/app/ui/calendar/goals/create-form";

export default function CreateGoal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-2 bg-transparent text-white text-sm self-start mt-6 cursor-pointer p-0! hover:bg-transparent hover:opacity-80"
                >
                    <CirclePlus size={14} className="fill-white/60" color="black"/>
                    <span className="opacity-60">Add a new goal</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <CreateGoalForm />
            </DialogContent>
        </Dialog>
    );
};