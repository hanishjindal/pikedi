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
        const { url, reasons, name, summary } = reqBody;

        if (!user) {
            resp.message = "Unauthorized"
            return new NextResponse(JSON.stringify(resp), { status: 400 });
        }

        if (!url || !reasons || !name || !summary) {
            resp.message = 'Missing  info'
            return new NextResponse(JSON.stringify(resp), { status: 400 })
        }

        const savedImage = await prisma.image.create({
            data: {
                userId: user.id,
                name,
                summary,
                url,
                reasons,
                email: user.email
            }
        })

        resp.message = "Image successfully Uploaded";
        resp.success = true;
        return NextResponse.json(resp)

    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}