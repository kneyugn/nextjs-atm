import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
});

refreshTokenSchema.index({ accessToken: 1 });

export default mongoose.models.refreshToken ||
  mongoose.model("refreshToken", refreshTokenSchema);
