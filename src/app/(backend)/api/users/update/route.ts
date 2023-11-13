import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, fullName, mobile, role, profilePic } = reqBody;

        // Check if the user exists
        const user = await User.findOne({ email, role }).select("-updatedAt -createdAt");
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        if (!user.isActive) {
            return NextResponse.json({ error: "User is inactive" }, { status: 400 });
        }

        // Check if password update is requested
        if (password && password.update) {
            const { old, new: newPassword, confirm } = password.data;

            // Verify old password
            const validPassword = await bcryptjs.compare(old, user.password);
            if (!validPassword) {
                return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
            }

            // Check if the new and confirm passwords match
            if (newPassword !== confirm) {
                return NextResponse.json({ error: "New password and confirm password do not match" }, { status: 400 });
            }

            // Hash and update the new password
            const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
            user.password = hashedNewPassword;
        }

        // Update other user details (fullName, mobile, etc.)
        if (fullName) user.fullName = fullName;
        if (mobile) user.mobile = mobile;
        if (profilePic) user.profilePic = profilePic;

        // Save the updated user
        await user.save();

        // Create token data
        const tokenData = {
            id: user._id,
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const userDataWithPassword = user.toObject();
        delete userDataWithPassword.password;

        const response = NextResponse.json({
            message: "User details updated successfully",
            success: true,
            data: userDataWithPassword,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
