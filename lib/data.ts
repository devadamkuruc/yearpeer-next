import {prisma} from "@/prisma";
import {auth} from "@/auth";

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({where: {id}});
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data.');
    }
}

export async function getGoalsByYear(year: number) {
    try {
        // Get the current user's session
        const session = await auth();

        // Check if user is authenticated
        if (!session || !session.user || !session.user.id) {
            throw new Error("You must be signed in to view goals");
        }

        const userId = session.user.id;

        // Create date range for the specified year
        const startOfYear = new Date(year, 0, 1); // January 1st of the specified year
        const endOfYear = new Date(year + 1, 0, 0); // December 31st of the specified year

        return await prisma.goal.findMany({
            where: {
                userId: userId,
                OR: [
                    // Start within the year
                    { startDate: { gte: startOfYear, lte: endOfYear } },
                    // End within the year
                    { endDate: { gte: startOfYear, lte: endOfYear } },
                    // Span across the year (start before and end after)
                    {
                        AND: [
                            { startDate: { lt: startOfYear } },
                            { endDate: { gt: endOfYear } }
                        ]
                    }
                ]
            },
            orderBy: {
                startDate: 'asc'
            }
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch goals for the year.");
    }
}