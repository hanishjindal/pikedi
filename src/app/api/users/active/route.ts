import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try {
        if (!request.cookies.get("token")?.value) {
            return NextResponse.json({
                data: {},
                active: false
            })
        }
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password -updatedAt -createdAt");
        return NextResponse.json({
            data: user,
            active: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}