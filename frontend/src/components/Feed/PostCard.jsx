import React, { useState } from "react";
import {
  User,
  Clock,
  Tag,
  MessageCircle,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  Trash,
  Briefcase,
} from "lucide-react";
import axios from "axios";

function PostCard({ post, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now - posted) / (1000 * 60));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    const options = { month: "short", day: "numeric" };
    if (posted.getFullYear() === now.getFullYear()) {
      return posted.toLocaleDateString("en-US", options);
    }

    return posted.toLocaleDateString("en-US", { ...options, year: "numeric" });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        setIsDeleting(true);
        const token = localStorage.getItem("token");
        await axios.delete(`/api/posts/${post._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (onDelete) onDelete();
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Failed to delete post. Please try again.");
      } finally {
        setIsDeleting(false);
        setIsMenuOpen(false);
      }
    }
  };

  const isAuthor = () => {
    const userId = localStorage.getItem("userId");
    return post.author?._id === userId;
  };

  // Truncate long text for compact view
  const truncateText = (text, maxLength = 140) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header - More compact */}
      <div className="px-3 py-2.5 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mr-2">
            <User size={16} />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-sm text-gray-900">
                {post.author?.name || "Anonymous"}
              </h3>
              {post.author?.jobTitle && (
                <span className="ml-1.5 text-xs text-gray-500 flex items-center">
                  <Briefcase size={10} className="mr-0.5" />
                  {post.author.jobTitle}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <Clock size={10} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {isAuthor() && (
          <div className="relative">
            <button
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreHorizontal size={16} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-gray-100 flex items-center"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash size={12} className="mr-2" />
                  {isDeleting ? "Deleting..." : "Delete Post"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content - Compact with expand option */}
      <div className="px-3 py-2">
        <h2 className="text-base font-medium text-gray-800 mb-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-700">
          {isExpanded ? post.body : truncateText(post.body)}
          {post.body && post.body.length > 140 && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="ml-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
            >
              Read more
            </button>
          )}
        </p>
      </div>

      {/* Post Tags - More compact */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-3 py-1">
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
              >
                <Tag size={10} className="mr-0.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Post Footer - More compact */}
      <div className="border-t border-gray-100 px-2 py-1.5 bg-gray-50 flex justify-between">
        <div className="flex items-center text-xs text-gray-500 space-x-3">
          <button className="flex items-center hover:text-blue-600 py-0.5 px-1">
            <ThumbsUp size={14} className="mr-1" />
            <span>Like</span>
          </button>
          <button className="flex items-center hover:text-blue-600 py-0.5 px-1">
            <MessageCircle size={14} className="mr-1" />
            <span>Comment</span>
          </button>
        </div>
        <button className="flex items-center text-xs text-gray-500 hover:text-blue-600 py-0.5 px-1">
          <Share2 size={14} className="mr-1" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
