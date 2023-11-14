import { connect } from "@/dbConfig/dbConfig";
import ImageModel from "@/models/imageModal";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { userId, email } = (await getDataFromToken(request));
        const { imageId } = reqBody;

        let images = await ImageModel.findOne({ email, userId, imageId });
        const resp = {
            message: "",
            success: false,
            data: {
                imageId
            }
        }

        if (!images) {
            resp.message = 'Image not found'
            return NextResponse.json(resp)
        }
        if (images.isActive) {
            resp.message = 'Image not in trash'
            return NextResponse.json(resp)
        }

        images.isActive = true
        await images.save()
        resp.message = 'Image moved to projects'
        resp.success = true
        const response = NextResponse.json(resp)
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}