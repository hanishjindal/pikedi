import { connect } from "@/dbConfig/dbConfig"
import contactus from "@/models/contactModal"
import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { fullName, email, mobile, message } = reqBody;


        const newMessage = new contactus({
            contactId: randomUUID(),
            fullName,
            email,
            mobile,
            message
        })

        const savedMessage = await newMessage.save()

        return NextResponse.json({
            message: "Message saved successfully",
            success: true,
            data: {}
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}