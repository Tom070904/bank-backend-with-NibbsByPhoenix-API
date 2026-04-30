import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    from: String,
    to: String,
    amount: Number,
    transactionId: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);