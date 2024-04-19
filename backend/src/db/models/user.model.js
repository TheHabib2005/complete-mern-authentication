import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },
    isVerifyed: {
      type: Boolean,
      default:false
    },
    token:{
      type: String,
       
    },
    profileImage:{
      type: String,
      default: "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0="
    },
    verificationCode:{
    type:Number
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);

export default User;
