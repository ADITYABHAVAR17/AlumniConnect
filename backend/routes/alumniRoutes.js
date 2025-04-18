import express from "express";
import {
  getAlumniList,
  getAlumniById,
  updateProfile,
  getMyProfile,
} from "../controllers/alumniController.js";
import { verifyToken } from "../middleware/authalumni.js";

const router = express.Router();

router.get("/", getAlumniList); // Public directory
router.get("/me", verifyToken, getMyProfile); // Current user profile
router.get("/:id", getAlumniById); // View individual profile
router.put("/me", verifyToken, updateProfile); // Edit own profile

export default router;
