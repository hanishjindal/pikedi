import { connect } from "@/dbConfig/dbConfig"
import ImageModel from "@/models/imageModal"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { userId, email } = (await getDataFromToken(request));
        const { url, reasons, name, summary } = reqBody;

        // if user exist
        const user = await User.findOne({ email, userId })

        if (!user) {
            return NextResponse.json({ error: "User doesn't exists" }, { status: 400 })
        }


        const newImage = new ImageModel({
            userId,
            email,
            url,
            reasons,
            imageId: randomUUID(),
            name,
            summary
        })

        const savedImage = await newImage.save()

        return NextResponse.json({
            message: "Image successfully Uploaded",
            success: true,
            savedImage
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}