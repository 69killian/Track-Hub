import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, username, password} = body;

        // checking if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({user: null, message: "User with this email already exists"}, {status: 409});
        }

        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({user: null, message: "User with this username already exists"}, {status: 409});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data : {
                username,
                email,
                password: hashedPassword
            }
        });
        // eslint-disable-next-line
        const { password: newUserPassword, ...rest } = newUser;


        return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
    
}