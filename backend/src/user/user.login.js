import User from "../db/models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt"
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "mdwear2005@gmail.com",
      pass: "ysdmetyqjkvxkkii",
    },
  });
  const mailOptions = {
    from: "mdwear2005@gmail.com",
    to: email,
    subjcet: "Verify your email",
    text: `your verification code is ${verificationCode}`,
  };

  if (!user) {
    return res
      .json({
        error: true,
        message: "User not exists",
        data: null,
      })
      .status(400);
  }

  let isPasswordMatch = await bcrypt.compareSync(password,user.password)

  if (!isPasswordMatch) {
    return res
      .json({
        error: true,
        message: "passwords do not match",
        data: null,
      })
      .status(400);
  }

  if (!user.isVerifyed) {
    const mailresponse = await transport.sendMail(mailOptions);

    return res
      .json({
        error: true,
        message:
          "Email not verified. frist verify your email using verifaction code ",
        data: null,
        needVerifaction: true,
      })
      .status(400);
  }

  let token = await jwt.sign({ token: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  user.token = token;

  return res.status(201).json({
    success: true,
    message: "User Login successfully",
    user_token: user.token,
  });
};

export default handleLogin;
