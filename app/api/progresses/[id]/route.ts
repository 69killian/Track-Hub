
import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const { id } = params;

        const progress = await db.progress.findMany({
            where: {
                habit: { userId: id },
            },
            select: {
                date: true,
                completed: true,
                habitId: true,  // Ajoute habitId ici
                createdAt: true,
                habit: {
                    select: { id: true } // Permet d'associer chaque habit à son total
                }
            },
        });
        

        // Regrouper les tâches par date et compter le total
        const progressMap: Record<string, { completed: number; total: number; createdAt: string; habitId: string }> = {};

        progress.forEach((p) => {
            const dateStr = p.date.toISOString().split('T')[0]; // Format YYYY-MM-DD
            if (!progressMap[dateStr]) {
                progressMap[dateStr] = { completed: 0, total: 0, createdAt: p.createdAt.toISOString(), habitId: p.habitId };
            }
            progressMap[dateStr].completed += p.completed ? 1 : 0;
            progressMap[dateStr].total += 1;
        });

        // Convertir en tableau pour le front
        const formattedProgress = Object.keys(progressMap).map(date => ({
            date,
            completed: progressMap[date].completed,
            total: progressMap[date].total,
            createdAt: progressMap[date].createdAt,
            habitId: progressMap[date].habitId, // Assure-toi d'envoyer habitId ici
        }));
        

        return NextResponse.json(formattedProgress, { status: 200 });
    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
