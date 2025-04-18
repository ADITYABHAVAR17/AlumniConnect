// controllers/adminController.js
import User from "../models/User.js";

// GET all alumni (pending + verified)
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: "alumni" }).select("-password");
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni", error });
  }
};

// GET specific alumni by ID
export const getAlumniById = async (req, res) => {
  try {
    const alumni = await User.findById(req.params.id).select("-password");
    if (!alumni) return res.status(404).json({ message: "Alumni not found" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni", error });
  }
};

// PATCH: Verify alumni
export const verifyAlumni = async (req, res) => {
  try {
    const alumni = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    res.json({ message: "Alumni verified", alumni });
  } catch (error) {
    res.status(500).json({ message: "Error verifying alumni", error });
  }
};

// DELETE: Remove alumni
export const deleteAlumni = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Alumni deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting alumni", error });
  }
};
