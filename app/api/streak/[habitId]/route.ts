import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(req: Request, { params }: { params: { habitId: string } }) {
    const { habitId } = params;

    try {
        // Vérifie si habitId est défini
        if (!habitId) {
            console.error("habitId is missing in the request params.");
            return NextResponse.json({ message: "habitId is missing" }, { status: 400 });
        }

        // Récupérer l'habitude correspondante à habitId
        const habit = await db.habit.findUnique({
            where: { id: habitId }
        });

        if (!habit) {
            console.error("Habit not found:", habitId);
            return NextResponse.json({ message: "Habit not found" }, { status: 404 });
        }

        // Incrémenter la streak de 1 (en s'assurant que c'est un entier)
        const updatedHabit = await db.habit.update({
            where: { id: habitId },
            data: {
                streak: habit.streak + 1 // Incrémente la streak de 1
            }
        });

        console.log("Updated habit with new streak:", updatedHabit);
        return NextResponse.json({ message: "Streak updated", habit: updatedHabit }, { status: 200 });
    } catch (error) {
        console.error("Error updating streak:", error);
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}
