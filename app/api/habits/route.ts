import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, name, frequency, goal } = body;

        if (!userId || !name || !frequency || !goal) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newHabit = await db.habit.create({
            data: {
                userId,
                name,
                frequency,
                goal,
            },
        });

        return NextResponse.json({ message: "Habit successfully created", habit: newHabit }, { status: 201 });
    } catch (error) {
        console.error("Error creating habit:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
