import { connectdb } from "@/dbConfig/dbConfig";
import Book from "@/models/bookingsModel";
import { NextRequest, NextResponse } from "next/server";
connectdb();
export async function POST(request = NextRequest) {
  try {
    const data = await request.json();
    let { email, dateandtime, Adults, Childrens, PwD, TotalAmt } = data;
    // console.log("in bookings",);
    console.log("to test console.log",typeof(TotalAmt));

    const newBooking  = new Book({
      email,
      dateandtime,
      Adults,
      Childrens,
      PwD,
      TotalAmt,
    });
    const savedUser = await newBooking.save();
    return NextResponse.json({ message: "Booking registered successfully" }, { status: 200 });

    //after this send verification email
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
