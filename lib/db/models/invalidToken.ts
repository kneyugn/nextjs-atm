import mongoose from "mongoose";

const invalidTokenSchema = new mongoose.Schema({
  accessToken: String,
});

invalidTokenSchema.index({ accessToken: 1 });

export default mongoose.models.invalidtoken ||
  mongoose.model("invalidtoken", invalidTokenSchema);
