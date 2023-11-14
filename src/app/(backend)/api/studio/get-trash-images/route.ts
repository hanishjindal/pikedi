import { connect } from "@/dbConfig/dbConfig";
import ImageModel from "@/models/imageModal";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { userId, email } = (await getDataFromToken(request));

        let images = await ImageModel.find({ email, userId, isActive: false }).select('-_id -__v');

        const resp: {
            message: string;
            success: boolean;
            data: any[];
        } = {
            message: "Something went wrong",
            success: false,
            data: []
        };

        if (!images || !Array.isArray(images)) {
            return NextResponse.json(resp)
        }

        resp.message = 'Data Loaded';
        resp.success = true;
        resp.data = images;

        const response = NextResponse.json({
            message: "Data Loaded",
            success: true,
            data: images
        });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
