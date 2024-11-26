import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectdb();

export async function POST(request = NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;
    console.log(data);
    const user = await User.findOne({ email ,password });
    if (!user) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Logged In success",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;

    //after this send verification email
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
