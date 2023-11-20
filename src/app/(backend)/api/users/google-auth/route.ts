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
        const { name, email, image } = reqBody;

        if (!email || !name || !image) {
            resp.message = 'Missing  info'
            return new NextResponse(JSON.stringify(resp), { status: 400 })
        }

        let checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!checkUser) {
            checkUser = await prisma.user.create({
                data: {
                    email: email.toLowerCase(),
                    name: name.trim(),
                    role: "STUDIO",
                    image
                }
            });
        }


        const tokenData = {
            id: checkUser.id,
            name: checkUser.name,
            email: checkUser.email,
            role: checkUser.role
        };
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        resp.message = "Login successful"
        resp.success = true
        resp.data = getFilteredData(checkUser);
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