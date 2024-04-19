import User from "../db/models/user.model.js";
import jwt from "jsonwebtoken"
const getUserdetails = async (req, res, next) => {
  const { userId } = await req.body;
  const isUserExisting = await User.findById({ _id: userId });

  if (!isUserExisting) {
    return res
      .json({
        error: true,
        message: "User not found",
      })
      .status(400);
  }


  let user = await User.findById({_id:userId}).select(["-password"])
  const hashedUserInfo = jwt.sign({token:user},process.env.JWT_SECRET,{
    expiresIn:"1d",
  })
  return res
   .json({
      success: true,
      message: "User found",
      data: hashedUserInfo,
    })
   .status(200);
};


export default getUserdetails;