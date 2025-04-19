import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import alumniDataRoutes from "./routes/alumniDataRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Needed for __dirname in ES Module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
//Alumni Routes
app.use("/api/alumni", alumniRoutes);
// Admin Routes
app.use("/api/admin", adminRoutes);

// Post Routes
app.use("/api/posts", postRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/data", alumniDataRoutes);

//serve the frontend dist file

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

// // Serve index.html for any unknown routes (for SPA routing)
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
