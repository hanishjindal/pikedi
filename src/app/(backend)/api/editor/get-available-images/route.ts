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

        if (!user || user.role !== 'EDITOR') {
            resp.message = "Unauthorized"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        let images = await prisma.image.findMany({
            where: {
                assigned: 'UNASSIGNED',
                isActive: true
            }
        })

        if (!images || !Array.isArray(images)) {
            resp.message = "No image found"
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
