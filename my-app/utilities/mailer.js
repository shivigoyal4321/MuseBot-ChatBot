import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const sendEmail = async ({ email, userId }) => {
  console.log("im in mailer:", email, userId);
  try {
    const token = uuidv4();
    const mailOptions = {
        from: "demomailtrap.com.", // sender address
        to: email, // list of receivers
        subject: "Password Reset", // Subject line
        html: `Copy and paste this link in your browser: ${process.env.DOMAIN}/verifyemail?token=${token}`, // html body
      };
    await User.findByIdAndUpdate(userId, {$set: {
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: Date.now() + 3600000,//expiry 1hr from now
    }});
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7c92aea999e27a",
          pass: "c0c6b62c433fdb"
        }
      });

    console.log(mailOptions);
    const mailres = await transport.sendMail(mailOptions);
    return(mailres)
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message);
  }
};
