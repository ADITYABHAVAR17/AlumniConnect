import React from "react";

function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`max-w-xs p-2 rounded-lg text-white ${
          isOwn ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
}

export default MessageBubble;
