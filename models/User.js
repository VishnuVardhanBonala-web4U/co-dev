import mongoose, {  models, model } from "mongoose";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type: String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        required:true,
    }
});


const User = models.User || model("User", userSchema)

export default User;