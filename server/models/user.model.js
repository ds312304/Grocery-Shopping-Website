import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    gender:{type:String, default:"Not Selected"},
    dob:{type:String, default:"Not Selected"},
    phone:{type:String, default:"000000000"},
    cartItems:{type:Object, default:{}},
},{minimize:false,timestamps:true})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;