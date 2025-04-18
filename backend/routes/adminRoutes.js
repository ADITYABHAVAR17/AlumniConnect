// routes/adminRoutes.js
import express from "express";
import {
  getAllAlumni,
  getAlumniById,
  verifyAlumni,
  deleteAlumni,
} from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(protect, isAdmin); // Protect all admin routes

router.get("/alumni", getAllAlumni); // Get all alumni
router.get("/alumni/:id", getAlumniById); // View specific alumni
router.patch("/alumni/verify/:id", verifyAlumni); // Verify alumni
router.delete("/alumni/:id", deleteAlumni); // Delete alumni

export default router;
