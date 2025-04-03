import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        // Récupérer les habitudes de l'utilisateur, y compris les champs demandés
        const habits = await db.habit.findMany({
            where: { userId: id },
            select: {
                id: true,
                userId: true,
                name: true,
                frequency: true,
                goal: true,
                createdAt: true,
                updatedAt: true, // On ajoute tous les champs demandés
            },
        });

        return NextResponse.json(habits, { status: 200 });
    } catch (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
