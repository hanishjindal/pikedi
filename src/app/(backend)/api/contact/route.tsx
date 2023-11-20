import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb";

const resp: any = {
    message: "",
    success: false,
    data: {}
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { name, email, mobile, message } = reqBody;

        if (!name || !email || !mobile || !message) {
            resp.message = 'Missing  info'
            return new NextResponse(JSON.stringify(resp), { status: 400 })
        }

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

        const savedMessage = await prisma.contact.create({
            data: {
                name,
                email,
                mobile,
                message
            }
        })

        resp.message = "Message saved successfully";
        resp.success = true;
        return NextResponse.json(resp)

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}