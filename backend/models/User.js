import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "alumni" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
