"use server" 
import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import Payment from "@/models/PaymentModel";
export const initiate = async(amount,username) => {
    await connectdb();

    var instance = new Razorpay({key_id: process.env.NEXT_PUBLIC_KEY_ID,key_secret: process.env.NEXT_PUBLIC_KEY_SECRET})

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in the database
    try {
        await Payment.create({oid: x.id,amount:amount,username:username})
        return NextResponse.json({ message:"Payment pending in the db"}, { status: 200 });

    } catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}