import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
  email: { type: String, reqired: true },
  amount: { type: Number, required: true },
  oid: { type: String },
  createdAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});
const User = mongoose.models.Payment || model("Payment", PaymentSchema);
export default User;
