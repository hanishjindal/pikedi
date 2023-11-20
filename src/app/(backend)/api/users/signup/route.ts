import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import prisma from "@/libs/prismadb";

const resp: any = {
    message: "",
    success: false,
    data: {}
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { name, email, mobile, password, role } = reqBody;

        if (!email || !name || !password || !role || !mobile) {
            resp.message = 'Missing  info'
            return new NextResponse(JSON.stringify(resp), { status: 400 })
        }

        // Validate email format using regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email || !emailRegex.test(email)) {
            resp.message = 'Invalid email format'
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        let mobileTrim = mobile.split('').join('')
        // Validate mobile format using regex
        const mobileRegex = /^(\+\d{1,4})?(\d{10,11})$/;
        if (!mobileTrim || !mobileRegex.test(mobileTrim)) {
            resp.message = 'Invalid mobile format'
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        const checkUser = await prisma.user.findUnique({
            where: {
                email,
                role
            }
        })

        if (checkUser) {
            resp.message = 'Account already exist, try login';
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                mobile: mobileTrim,
                name: name.trim(),
                hashedPassword,
                role
            }
        });

        resp.message = "User successfully created"
        resp.success = true
        resp.data = user
        return NextResponse.json(resp)

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}