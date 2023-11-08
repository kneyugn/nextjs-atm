import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  cardId: String,
  date: Date,
});

transactionSchema.index({ cardId: 1 });

export default mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
