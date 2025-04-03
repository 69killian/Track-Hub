import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const { id } = params;
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); 
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); 

        const progress = await db.progress.findMany({
            where: {
                habit: { userId: id }, 
                date: {
                    gte: todayStart,
                    lt: todayEnd,
                },
            },
        });

        return NextResponse.json(progress, { status: 200 });
    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}


