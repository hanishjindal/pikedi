import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {

    try {
        if (!request.cookies.get("token")?.value) {
            return NextResponse.json({
                data: {},
                active: false,
                state:1
            })
        }
        const userId = (await getDataFromToken(request)).id;
        const user = await User.findOne({ _id: userId }).select("-password -updatedAt -createdAt");

        if (!user || !user.isActive) {
            const response = NextResponse.json({
                data: {},
                active: false,
                state:2
            })
            response.cookies.set('token', "", { expires: new Date(0) });
            return response;
        }

        return NextResponse.json({
            data: user,
            active: true,
            state:3
        })
    } catch (error: any) {
        const response = NextResponse.json({
            data: error.message,
            active: false,
            error: true
        }, { status: (error.message === 'jwt expired') ? 401 : 400 })

        if (error.message === 'jwt expired') {
            response.cookies.set('token', "", { expires: new Date(0) });
        }

        return response;
    }

}