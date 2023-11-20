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
        const { imageId } = reqBody;

        if (!user) {
            resp.message = "Unauthorized"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        let images = await prisma.image.findUnique({
            where: {
                imageId,
                email: user?.email,
                userId: user?.id,
            }
        })

        if (!images) {
            resp.message = 'Image not found'
            return NextResponse.json(resp)
        }
        if (images.isActive) {
            resp.message = 'Image not in trash'
            return NextResponse.json(resp)
        }

        await prisma.image.update({
            where: {
                imageId,
                email: user?.email,
                userId: user?.id,
            },
            data: {
                isActive: true,
            }
        })

        resp.message = 'Image moved to projects'
        resp.success = true
        resp.data = { imageId }
        const response = NextResponse.json(resp)
        return response;

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}