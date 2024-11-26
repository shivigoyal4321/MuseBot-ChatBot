import { connectdb } from "@/dbConfig/dbConfig";
import Payment from "@/models/PaymentModel";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
connectdb();
export async function POST(request = NextRequest) {
  const data = await request.json();
  const { amount, username } = data;
  console.log(data);
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.NEXT_PUBLIC_KEY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };
  let x = await instance.orders.create(options);
  console.log(x);
  //create a payment object which shows a pending payment in the database
  try {
    await Payment.create({ oid: x.id, amount: amount, email: username });
    return NextResponse.json({ message: x.id }, { status: 200 });
  } catch (error) {
    console.log("failed");
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
