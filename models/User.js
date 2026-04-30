import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {                
      type: String,
      required: true
    },
    kycType: String,
    kycId: String,
    kycVerified: {
      type: Boolean,
      default: false,
    },
    accountNumber: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);