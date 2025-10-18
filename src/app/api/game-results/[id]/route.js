import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

// DELETE - Delete a specific game result by ID
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // Check if game result exists
        const existingResult = await prisma.gameResult.findUnique({
            where: { id },
        });

        if (!existingResult) {
            return Response.json(
                { error: 'Game result not found' },
                { status: 404 }
            );
        }

        // Delete the game result
        await prisma.gameResult.delete({
            where: { id },
        });

        return Response.json(
            { message: 'Game result deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting game result:', error);
        return Response.json(
            { error: 'Failed to delete game result' },
            { status: 500 }
        );
    }
}

// GET - Get a specific game result by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const gameResult = await prisma.gameResult.findUnique({
            where: { id },
        });

        if (!gameResult) {
            return Response.json(
                { error: 'Game result not found' },
                { status: 404 }
            );
        }

        return Response.json(gameResult);
    } catch (error) {
        console.error('Error fetching game result:', error);
        return Response.json(
            { error: 'Failed to fetch game result' },
            { status: 500 }
        );
    }
}
