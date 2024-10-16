import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import  bcrypt  from 'bcrypt';

export const POST = async (req) => {
    const { username, email, password } = await req.json(); // Fixed the typo from "passaword" to "password"

    try {
        await dbConnect();

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return NextResponse.json({ msg: "User already exists" }, { status: 409 }); // Use 409 Conflict status
        }

        // Create new user

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword // Store the hashed password
        });



        return NextResponse.json({ msg: "User created successfully", user: { id: newUser._id, username: newUser.username, email: newUser.email } }, { status: 201 }); // Return created user info
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Error during signing up user" }, { status: 500 }); // Added status code
    }
};
