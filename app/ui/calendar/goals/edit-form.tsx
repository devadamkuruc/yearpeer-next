"use client"

import {DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useActionState} from "react";
import {editGoal, GoalState} from "@/app/lib/actions";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {GOAL_COLORS} from "@/constants";
import {ImpactLevel} from "@prisma/client";
import {Goal} from "@/lib/definitions";
import {formatDateForInput} from "@/lib/date-utils";

// Define a mapping for display purposes
const IMPACT_DISPLAY = {
    [ImpactLevel.MINIMAL]: "Minimal",
    [ImpactLevel.MODERATE]: "Moderate",
    [ImpactLevel.SIGNIFICANT]: "Significant",
    [ImpactLevel.MAJOR]: "Major",
    [ImpactLevel.CRITICAL]: "Critical"
};

interface EditGoalFormProps {
    goal: Goal;
}

export default function EditGoalForm({ goal }: EditGoalFormProps) {
    const initialState: GoalState = {message: null, errors: {}};
    const updateGoalWithId = editGoal.bind(null, goal.id);
    const [state, formAction] = useActionState(updateGoalWithId, initialState);

    return (
        <form action={formAction}>
            <DialogHeader>
                <DialogTitle>Edit Goal</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title" className="text-right">
                        Title
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        defaultValue={goal.title}
                        aria-describedby="title-error"
                    />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.title &&
                            state.errors.title.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={goal.description || ""}
                        aria-describedby="description-error"
                    />
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                            state.errors.description.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="flex w-full gap-2">
                    <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="startDate" className="text-right">
                            Start date
                        </Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            defaultValue={formatDateForInput(goal.startDate)}
                            aria-describedby="startDate-error"
                        />
                        <div id="startDate-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.startDate &&
                                state.errors.startDate.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="endDate" className="text-right">
                            End date
                        </Label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            defaultValue={formatDateForInput(goal.endDate)}
                            aria-describedby="endDate-error"
                        />
                        <div id="endDate-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.endDate &&
                                state.errors.endDate.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-2">
                    <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="color" className="text-right">
                            Color
                        </Label>
                        <Select name="color" defaultValue={goal.color}>
                            <SelectTrigger className="w-full" id="color">
                                <SelectValue placeholder="Select a color"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Colors</SelectLabel>
                                    {GOAL_COLORS.map((color, index) => (
                                        <SelectItem value={color} key={index}>
                                            <div className="flex items-center">
                                                <div
                                                    className="h-4 w-4 rounded-full mr-2"
                                                    style={{background: color}}
                                                />
                                                {color}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div id="color-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.color &&
                                state.errors.color.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="impact" className="text-right">
                            Impact
                        </Label>
                        <Select name="impact" defaultValue={goal.impact}>
                            <SelectTrigger className="w-full" id="impact">
                                <SelectValue placeholder="Select impact level"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Impact</SelectLabel>
                                    {Object.entries(IMPACT_DISPLAY).map(([level, display]) => (
                                        <SelectItem value={level} key={level}>
                                            {display}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div id="impact-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.impact &&
                                state.errors.impact.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* General form error message */}
                {state.message && state.message !== "Goal updated successfully" && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}
                {state.message === "Goal updated successfully" && (
                    <p className="text-sm text-green-500">{state.message}</p>
                )}
            </div>
            <DialogFooter>
                <Button type="submit">Edit goal</Button>
            </DialogFooter>

        </form>
    );
};