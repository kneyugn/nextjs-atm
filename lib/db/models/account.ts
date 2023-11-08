import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  balance: Number,
  cardId: String,
  createdAt: Date,
  updatedAt: Date,
});

accountSchema.index({ cardId: 1 });

export default mongoose.models?.account ||
  mongoose.model("account", accountSchema);
