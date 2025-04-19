// PostCard.jsx - Enhanced version
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
  Bookmark,
  Heart,
  Award,
  PenTool,
} from "lucide-react";
import { motion } from "framer-motion";

function PostCard({ post, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
  const truncateText = (text, maxLength = 180) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Determine if post is featured (example logic)
  const isFeatured = post.featured || (post.likes && post.likes > 10);

  // Determine if post is from an alumnus
  const isAlumnus =
    post.author?.graduationYear &&
    post.author.graduationYear < new Date().getFullYear();

  // Get post category color
  const getCategoryColor = () => {
    const categories = {
      event: "bg-purple-500",
      job: "bg-green-500",
      announcement: "bg-blue-500",
      question: "bg-yellow-500",
      discussion: "bg-indigo-500",
    };
    return categories[post.category] || "bg-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
        isFeatured ? "border-amber-300" : "border-gray-200"
      }`}
    >
      {/* Featured banner */}
      {isFeatured && (
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 py-1 px-3 text-white text-xs font-medium flex items-center justify-center">
          <Award size={12} className="mr-1" />
          Featured Post
        </div>
      )}

      {/* Post Header - Redesigned */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm bg-gradient-to-br from-blue-500 to-indigo-600">
            {post.author?.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author?.name || "Anonymous"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white">
                <User size={18} />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold text-gray-900">
                {post.author?.name || "Anonymous"}
              </h3>
              {isAlumnus && (
                <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-md">
                  Alumni
                </span>
              )}
            </div>

            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              {post.author?.jobTitle && (
                <span className="flex items-center mr-2">
                  <Briefcase size={10} className="mr-1" />
                  {post.author.jobTitle}
                  <span className="mx-1.5">•</span>
                </span>
              )}
              <Clock size={10} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>

              {post.category && (
                <>
                  <span className="mx-1.5">•</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${getCategoryColor()} text-white`}
                  >
                    {post.category}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-full transition-colors ${
              isBookmarked
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Bookmark
              size={16}
              className={isBookmarked ? "fill-current" : ""}
            />
          </button>

          {isAuthor() && (
            <div className="relative">
              <button
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MoreHorizontal size={16} />
              </button>

              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200"
                >
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <PenTool size={14} className="mr-2" />
                    Edit Post
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash size={14} className="mr-2" />
                    {isDeleting ? "Deleting..." : "Delete Post"}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content - Enhanced */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {post.title}
        </h2>
        <div
          className={`prose prose-sm max-w-none text-gray-700 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          <p>{isExpanded ? post.body : truncateText(post.body)}</p>
        </div>
        {post.body && post.body.length > 180 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* Post Images/Attachments */}
        {post.images && post.images.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden bg-gray-100 aspect-video"
              >
                <img
                  src={img}
                  alt={`Attachment ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Tags - Redesigned */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-4 py-2">
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Post Footer - Enhanced */}
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center text-sm hover:text-blue-600 transition-colors ${
              isLiked ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {isLiked ? (
              <Heart size={16} className="mr-1.5 fill-current" />
            ) : (
              <ThumbsUp size={16} className="mr-1.5" />
            )}
            <span>
              {isLiked ? (post.likes ? post.likes + 1 : 1) : post.likes || 0}
            </span>
          </button>
          <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <MessageCircle size={16} className="mr-1.5" />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
        <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
          <Share2 size={16} className="mr-1.5" />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
}

export default PostCard;
