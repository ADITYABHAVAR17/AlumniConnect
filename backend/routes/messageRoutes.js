import express from "express";
import Message from "../models/Message.js";
import verifyToken from "../middleware/authalumni.js";

const router = express.Router();

// 💌 Send a message
router.post("/", verifyToken, async (req, res) => {
  const { receiver, message } = req.body;

  try {
    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      message,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// 📬 Get all messages between two users
router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ timestamp: 1 }); // oldest first

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
