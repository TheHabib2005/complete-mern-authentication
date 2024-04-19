import User from "../db/models/user.model.js";
import brycpt from "bcrypt";
import { transport } from "../utils/sendEmail.js";
const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;

    //send email
    const hashedpassword = await brycpt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
  
    const mailOptions = {
      from: "mdwear2005@gmail.com",
      to: email,
      subjcet: "Verify your email",
      text: `your verification code is ${verificationCode}`,
    };

  const user = await User.findOne({ email: email });
 
  if (user) {
    // resend for email verify 
    const mailresponse = await transport.sendMail
    (mailOptions);

    user.verificationCode = verificationCode
    await user.save()
     

    return res.json({
      success: true,
      message: "User already exists",
      user_id:user._id
    }).status(400);
  }


  const newUser = new User({
    username,
    email,
    password: hashedpassword,
    verificationCode
  });



  const saveduser = await newUser.save();

//send email ehwn user created for varify user
  const mailresponse = await transport.sendMail
  (mailOptions);

  const userid= saveduser._id
  if(mailOptions){
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        user_id:userid
      });
  }

 
};

export default handleRegister;
