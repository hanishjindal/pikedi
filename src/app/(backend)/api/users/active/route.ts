import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import getFilteredData from "@/helpers/getFilteredData";

const resp: any = {
    message: "",
    success: false,
    data: {}
}

export async function POST(request: NextRequest) {

    try {
        if (!request.cookies.get("token")?.value) {
            return NextResponse.json(resp)
        }

        const userData = await getDataFromToken(request);
        const user = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        if (!user) {
            throw new Error("User does not exist")
        }
        if (!user.isActive) {
            throw new Error("User is inactive")
        }

        resp.success = true;
        resp.data = getFilteredData(user);
        return NextResponse.json(resp);
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