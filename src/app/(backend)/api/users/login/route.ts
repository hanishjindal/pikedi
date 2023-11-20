import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import prisma from "@/libs/prismadb";
import jwt from "jsonwebtoken";
import getFilteredData from "@/helpers/getFilteredData";

const resp: any = {
    message: "",
    success: false,
    data: {}
}

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password, role } = reqBody;

        if (!email || !password || !role) {
            resp.message = 'Missing  info'
            return new NextResponse(JSON.stringify(resp), { status: 400 })
        }

        // Validate email format using regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email || !emailRegex.test(email)) {
            resp.message = 'Invalid email format'
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        //check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email,
                role
            }
        })


        if (!user) {
            resp.message = "User does not exist"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }
        if (!user.isActive) {
            resp.message = "User is inactive"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }


        //check if password is correct
        if (user.hashedPassword) {
            const validPassword = await bcryptjs.compare(password, user.hashedPassword)
            if (!validPassword) {
                resp.message = "Invalid password"
                return new NextResponse(JSON.stringify(resp), { status: 400 });
            }
        } else {
            resp.message = "Login with google or create a password"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        //create token data
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        resp.message = "Login successful"
        resp.success = true
        resp.data = getFilteredData(user);
        const response = NextResponse.json(resp)
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}