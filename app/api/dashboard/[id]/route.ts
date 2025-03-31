import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Récupère `userId` directement depuis l'URL

    // Récupère les habitudes pour cet utilisateur
    const habits = await db.habit.findMany({
      where: { userId: id },
    });

    return NextResponse.json(habits, { status: 200 });
  } catch (error) {
    console.error("Error fetching habits:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
