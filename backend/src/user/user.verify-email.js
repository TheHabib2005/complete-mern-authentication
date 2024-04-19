import User from "../db/models/user.model.js";

const verifyEmail = async (req,res) =>{
   const {userId,codeFromUser} = req.body;
   const user = await User.findOne({_id:userId});

   if(user.verificationCode !== parseInt(codeFromUser)){
    return res.json({
        error: true,
        message: "Email verified failed",
      }).status(400);
   }

   user.isVerifyed = true;
   user.verificationCode = "";

   await user.save()

   return res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
  
}

export default verifyEmail;