import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/utilities/mailer";
import { NextRequest, NextResponse } from "next/server";

connectdb();

export async function POST(request = NextRequest) {
  try {
    const data = await request.json();
    const { email } = await data;
    console.log("im in forgot pass",data);
    const user = await User.findOne({ email });
    console.log("im in forgot pass 2",user);
    await sendEmail({email,userId:user._id})

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    //after this send verification email

  } catch (error) {
    return NextResponse.json({ message: "Email Failed" }, { status: 500 });
  }

}
