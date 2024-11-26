import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
  },
  Dateandtime: {
    type: String,
  },
  Adults: {
    type: Number,
  },
  Children: {
    type: Number,
  },
  PwD: {
    type: Number,
  },
  TotalAmt: {
    type: String,
  },
});
const Book = mongoose.models.bookings || model("bookings", userSchema);
export default Book;
