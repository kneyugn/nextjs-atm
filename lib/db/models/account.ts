import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  balance: Number,
  cardId: String,
});

accountSchema.index({ cardId: 1 });

export default mongoose.models.account ||
  mongoose.model("account", accountSchema);
