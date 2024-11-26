import { connectdb } from "@/dbConfig/dbConfig";
import Payment from "@/models/PaymentModel";
import { NextRequest, NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
connectdb();
export async function POST(request = NextRequest) {
 let body = await request.formData();
 body = Object.fromEntries(body);

 let p = await Payment.findOne({oid: body.razorpay_order_id})
 if(!p){
  return NextResponse.json({success:false,message:"Order Id not found"});
 }
 //verify the payment
 let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id},body.razorpay_signature, process.env.NEXT_PUBLIC_KEY_SECRET);
 if(xx){
  const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:"true"},{new:true})
  console.log(updatedPayment)
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
 }
 else{
  return NextResponse.error("Payment Verification Failed")
 }
}
