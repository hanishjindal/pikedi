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

        if (!user || user.role !== 'EDITOR') {
            resp.message = "Unauthorized"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        if (!imageId) {
            resp.message = 'Missing  info'
            return new NextResponse(JSON.stringify(resp), { status: 400 })
        }

        const checkAssigned = await prisma.image.findFirst({
            where: {
                assigned: 'ASSIGNED',
                editorId: user._id
            }
        })

        if (checkAssigned) {
            resp.message = "Already Assigned"
            return new NextResponse(JSON.stringify(resp));
        }

        const savedImage = await prisma.image.update({
            where: {
                imageId
            },
            data: {
                assigned: 'ASSIGNED',
                editorId: user._id
            }
        })

        resp.message = "Image Assigned";
        resp.success = true;
        return NextResponse.json(resp)

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}