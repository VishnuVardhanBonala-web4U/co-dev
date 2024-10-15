import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server"


export const POST =  async (req) => {
    const {username, email, password} = await req.json();
    try {
        await dbConnect();
        const user = await User.findOne({email});
        if(user){
           return NextResponse.json({msg:"User already exist", user})
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        return NextResponse.json({mag:"User created succefully"})

    } catch (error) {
        console.error(error);
        return NextResponse.json({msg:"Error during Signing-up user"})
    }
    
}