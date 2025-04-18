import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  batch: String,
  branch: String,
  jobTitle: String,
  company: String,
  location: String,
  bio: String,
  linkedIn: String,
  isVerified: { type: Boolean, default: false }, // for admin approval
});

export default mongoose.model("Alumni", alumniSchema);
