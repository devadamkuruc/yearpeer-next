"use server"

import {z} from 'zod';
import {GOAL_COLORS} from "@/constants";
import {auth} from "@/auth";
import {prisma} from "@/prisma";
import {ImpactLevel } from '@prisma/client';
import {revalidatePath} from "next/cache";

const GoalSchema = z.object({
    id: z.string().optional(), // Optional for creation, required for updates
    userId: z.string({
        required_error: "User ID is required",
    }),
    title: z.string({
        required_error: "Title is required",
    }).min(1, "Title is required").max(255, "Title cannot exceed 255 characters"),
    description: z.string().max(1000, "Description is too long").optional(),
    startDate: z.date({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a valid date",
    }),
    endDate: z.date({
        required_error: "End date is required",
        invalid_type_error: "End date must be a valid date",
    }),
    color: z.string({
        required_error: "Color is required",
    }).max(7).refine((color) => GOAL_COLORS.includes(color), {
        message: "Invalid color selection",
    }),
    impact: z.nativeEnum(ImpactLevel, {
        required_error: "Impact level is required",
    }),
    // Timestamps are typically handled by Prisma automatically
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

 const CreateGoalSchema = GoalSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

// Schema for updating an existing goal (both id and userId needed)
 const UpdateGoalSchema = GoalSchema.omit({
    createdAt: true,
    updatedAt: true
});

 const CreateGoalSchemaWithValidation = CreateGoalSchema.refine(
    (data) => data.endDate >= data.startDate,
    {
        message: "End date must be after start date",
        path: ["endDate"],
    }
);

export type GoalState = {
    errors?: {
        userId?: string[];
        title?: string[];
        description?: string[];
        startDate?: string[];
        endDate?: string[];
        color?: string[];
        impact?: string[];
    };
    message?: string | null;
};

export async function createGoal(prevState: GoalState, formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            message: "You must be signed in to create a goal.",
        };
    }

    // Extract user ID from the session
    const userId = session.user.id;

    const validatedFields = CreateGoalSchemaWithValidation.safeParse({
        userId,
        title: formData.get('title'),
        description: formData.get('description') || undefined,
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        color: formData.get('color'),
        impact: formData.get('impact') as ImpactLevel,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Goal.',
        };
    }

    const { title, description, startDate, endDate, color, impact } = validatedFields.data;

    try {
        // Here you would use Prisma to create the goal
        await prisma.goal.create({
            data: {
                userId,
                title,
                description,
                startDate,
                endDate,
                color,
                impact,
            },
        });

        revalidatePath("/calendar");

        return { message: "Goal created successfully" };
    } catch (error) {
        console.error("Failed to create goal:", error);
        return { message: "Database Error: Failed to create goal." };
    }
}

export async function editGoal(goalId: string, prevState: GoalState, formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            message: "You must be signed in to create a goal.",
        };
    }

    // Extract user ID from the session
    const userId = session.user.id;

    const existingGoal = await prisma.goal.findUnique({
        where: {
            id: goalId,
            userId: userId, // Ensuring the goal belongs to the current user
        },
    });

    if (!existingGoal) {
        return {
            message: "Goal not found or you don't have permission to edit it.",
        };
    }

    const validatedFields = CreateGoalSchemaWithValidation.safeParse({
        userId,
        title: formData.get('title'),
        description: formData.get('description') || undefined,
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        color: formData.get('color'),
        impact: formData.get('impact') as ImpactLevel,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Goal.',
        };
    }

    const { title, description, startDate, endDate, color, impact } = validatedFields.data;

    try {
        await prisma.goal.update({
            where: {
                id: goalId,
            },
            data: {
                title,
                description,
                startDate,
                endDate,
                color,
                impact,
                updatedAt: new Date(),
            },
        });

        revalidatePath("/calendar");

        return { message: "Goal updated successfully" };
    } catch (error) {
        console.error("Failed to update goal:", error);
        return { message: "Database Error: Failed to update goal." };
    }
}