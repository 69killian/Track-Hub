import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { habitId, date, completed } = body;

        // valid input datas
        if (!habitId || !date || completed === undefined) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }

        // verify if habits exists
        const habitExists = await db.habit.findUnique({
            where: { id: habitId }
        });

        if (!habitExists) {
            return NextResponse.json({ message: "Habit not found" }, { status: 404 });
        }

        const newProgress = await db.progress.create({
            data: {
                habitId,
                date: new Date(date), // date is new Date(date)
                completed
            },
        });

        return NextResponse.json({ message: "Progress successfully created", progress: newProgress }, { status: 201 });
    } catch (error) {
        console.error("Error creating progress:", error);
        return NextResponse.json({ message: "Internal Server Error", error: "Unknown error" }, { status: 500 });
    }
}
