import express from "express";
import { getVerifiedAlumni } from "../controllers/alumniDataController.js";
// import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/alumni?batch=2020&branch=CSE&jobTitle=Engineer&location=Pune
router.get("/", getVerifiedAlumni);

export default router;
