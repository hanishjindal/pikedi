import { connect } from "@/dbConfig/dbConfig";
import ImageModel from "@/models/imageModal";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { userId, email } = (await getDataFromToken(request));

        let images = await ImageModel.find({ email, userId }).select('-_id -__v');

        if (!images || !Array.isArray(images)) {
            return NextResponse.json({
                message: "Something went wrong",
                success: false,
                data: []
            })
        }
        images.filter((item) => item.isActive === true)
        if (!images.length) {
            return NextResponse.json({
                message: "Image not available",
                success: false,
                data: []
            })
        }

        const response = NextResponse.json({
            message: "Data Loaded",
            success: true,
            data: images
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}