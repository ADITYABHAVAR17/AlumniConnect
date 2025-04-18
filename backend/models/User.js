import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "alumni" },
  batch: String,
  branch: String,
  jobTitle: String,
  company: String,
  location: String,
  bio: String,
  linkedIn: String,
  isVerified: { type: Boolean, default: false }, // for admin approval
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
