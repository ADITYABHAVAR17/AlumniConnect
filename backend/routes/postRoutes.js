import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create new post
router.post("/", auth, createPost);

// Get all posts (with optional tag filter)
router.get("/", getPosts);

// Get single post by ID
router.get("/:id", getPostById);

export default router;
