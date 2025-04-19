import React from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "./ChatWindow";
import { getUserFromToken } from "../../utils/getUserFromToken"; // optional helper

function ChatWindowWrapper() {
  const { receiverId } = useParams();
  const currentUser = getUserFromToken(); // or get user from context/state

  return (
    <div>
      <ChatWindow currentUserId={currentUser._id} receiverId={receiverId} />
    </div>
  );
}

export default ChatWindowWrapper;
