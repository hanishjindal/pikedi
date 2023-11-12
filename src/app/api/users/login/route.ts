import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password, role } = reqBody;

        //check if user exists
        const user = await User.findOne({ email, role }).select("-updatedAt -createdAt")
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        if (!user.isActive) {
            return NextResponse.json({ error: "User is inactive" }, { status: 400 })
        }


        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        //create token data
        const tokenData = {
            id: user._id,
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
        };
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const userDataWithPassword = user.toObject();
        delete userDataWithPassword.password;

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data: userDataWithPassword
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}