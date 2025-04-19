import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";

function ChatWindow({ currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/messages/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        `/api/messages`,
        { receiver: receiverId, message: input },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [receiverId]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <div className="h-80 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.sender === currentUserId}
          />
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
