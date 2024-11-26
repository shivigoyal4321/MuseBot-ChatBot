import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: String,
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
