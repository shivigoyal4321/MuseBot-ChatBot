import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectdb();

export async function POST(request = NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;
    console.log(data);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const newUser = new User({
      email,
      password,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({ message: "User registered successfully" }, { status: 200 });

    //after this send verification email

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
