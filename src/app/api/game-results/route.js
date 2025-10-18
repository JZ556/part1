import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

// POST - Create a new game result
export async function POST(request) {
    try {
        const body = await request.json();
        const { username, result } = body;

        // Validate required fields
        if (!username || !result) {
            return Response.json(
                { error: 'Username and result are required' },
                { status: 400 }
            );
        }

        // Create new game result
        const gameResult = await prisma.gameResult.create({
            data: {
                username,
                result,
            },
        });

        return Response.json(gameResult, { status: 201 });
    } catch (error) {
        console.error('Error creating game result:', error);
        return Response.json(
            { error: 'Failed to create game result' },
            { status: 500 }
        );
    }
}

// GET - Retrieve all game results
export async function GET() {
    try {
        const gameResults = await prisma.gameResult.findMany({
            orderBy: {
                createdAt: 'desc', // Most recent first
            },
        });

        return Response.json(gameResults);
    } catch (error) {
        console.error('Error fetching game results:', error);
        return Response.json(
            { error: 'Failed to fetch game results' },
            { status: 500 }
        );
    }
}
