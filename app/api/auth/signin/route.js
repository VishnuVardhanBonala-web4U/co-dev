import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { email, password } = await req.json();

    try {
        await dbConnect(); // Ensure DB connection

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ msg: "Invalid email or password" }, { status: 401 });
        }

        // Check password validity
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ msg: "Invalid email or password" }, { status: 401 });
        }

        // Return user information (avoid returning the password)
        return NextResponse.json({
            msg: "User logged in successfully",
            user: { id: user._id, email: user.email, username: user.username }
        }, { status: 200 }); // Return success status code

    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Error during sign-in" }, { status: 500 }); // Added status code
    }
};
