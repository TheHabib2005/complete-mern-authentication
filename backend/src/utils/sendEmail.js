import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
  secure: true,
    auth: {
      user: "mdwear2005@gmail.com",
      pass: "ysdmetyqjkvxkkii"
    }
  });

