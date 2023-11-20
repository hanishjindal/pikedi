import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import prisma from "@/libs/prismadb";
import getFilteredData from "@/helpers/getFilteredData";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const resp: any = {
    message: "",
    success: false,
    data: {}
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userData = await getDataFromToken(request);
        const { password, name, mobile, image } = reqBody;

        if (!userData) {
            resp.message = 'Unauthorized';
            return new NextResponse(JSON.stringify(resp), { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: userData?.email,
                role: userData?.role
            }
        })

        if (!user) {
            resp.message = 'Unauthorized';
            return new NextResponse(JSON.stringify(resp), { status: 401 });
        }

        if (!user?.isActive) {
            resp.message = "User is inactive";
            return NextResponse.json(resp, { status: 400 });
        }

        const update: any = {

        }

        // Check if password update is requested
        if (password && password.update && user.hashedPassword) {
            const { old, new: newPassword, confirm } = password.data;

            const validPassword = await bcryptjs.compare(old, user.hashedPassword);
            if (!validPassword) {
                resp.message = "Incorrect password";
                return NextResponse.json(resp, { status: 400 });
            }

            // Check if the new and confirm passwords match
            if (newPassword !== confirm) {
                resp.message = "New password and confirm password do not match";
                return NextResponse.json(resp, { status: 400 });
            }

            // Hash and update the new password
            const salt = await bcryptjs.genSalt(10)
            const hashedNewPassword = await bcryptjs.hash(password, salt)
            update['password'] = hashedNewPassword;
        }

        // Update other user details (name, mobile, etc.)
        if (name) update['name'] = name;
        if (mobile) update['mobile'] = mobile;
        if (image) update['image'] = image;

        // Save the updated user
        const updatedUser = await prisma.user.update({
            where: {
                email: user.email
            },
            data: update,
        });

        resp.message = "User details updated successfully";
        resp.success = true;
        resp.data = getFilteredData(updatedUser);
        const response = NextResponse.json(resp);
        return response;
    } catch (error: any) {
        resp.message = error.message
        return NextResponse.json(resp, { status: 500 })
    }
}
