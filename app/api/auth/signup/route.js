import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server"


export const POST =  async (req) => {
    const {username, email, passaword} = await req.json();
    try {
        await dbConnect();
        const user = await UserModel.findOne({email});
        if(user){
           return NextResponse.json({msg:"User already exist", user})
        }

        const newUser = await UserModel.create({
            username,
            email,
            password
        })

        return NextResponse.json({mag:"User created Successfully"})

    } catch (error) {
        console.error(error);
        return NextResponse.json({msg:"Error during Signing-up user"})
    }
    
}