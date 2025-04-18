import React from "react";

function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p>{post.body}</p>
      <p className="text-sm text-gray-500">
        By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="flex gap-2 flex-wrap">
        {post.tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
