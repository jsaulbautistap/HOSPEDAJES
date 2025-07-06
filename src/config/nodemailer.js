import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_MAIL_TRAP,
    pass: process.env.PASSWORD_MAIL_TRAP,
  },
  
});

export default transporter;


