import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const resp: any = {
    message: "",
    success: false,
    data: {}
}

export async function POST(request: NextRequest) {
    try {
        const user = await getDataFromToken(request);
        const reqBody = await request.json()

        if (!user) {
            resp.message = "Unauthorized"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        let images = await prisma.image.findMany({
            where: {
                email: user?.email,
                userId: user?.id,
                isActive: false
            }
        })

        if (!images || !Array.isArray(images)) {
            resp.message = "Trash is empty"
            return NextResponse.json(resp)
        }

        resp.message = 'Data Loaded';
        resp.success = true;
        resp.data = images;

        const response = NextResponse.json(resp);
        return response;

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}
