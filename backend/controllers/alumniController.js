import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getAlumniList = async (req, res) => {
  try {
    const alumni = await User.find({ isVerified: true }).select("-__v");
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
};

export const getAlumniById = async (req, res) => {
  try {
    const alumni = await User.findById(req.params.id).select("-__v");
    if (!alumni || !alumni.isVerified)
      return res.status(404).json({ error: "Alumni not found" });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const getMyProfile = async (req, res) => {
  console.log(req.user);
  try {
    const alumni = await User.findById(req.user.id).select("-__v");
    if (!alumni) return res.status(404).json({ error: "Profile not found" });
    res.json(alumni);
    // console.log(alumni);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const alumni = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });
    if (!alumni) return res.status(404).json({ error: "Profile not found" });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
