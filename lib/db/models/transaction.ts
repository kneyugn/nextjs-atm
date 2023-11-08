import { TransactionType } from "@/lib/utils/types";
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  cardId: String,
  createdAt: Date,
  transactionType: String,
});

transactionSchema.index({ cardId: 1 });

export default mongoose.models?.transaction ||
  mongoose.model("transaction", transactionSchema);
