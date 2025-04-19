import React, { useState } from "react";
import axios from "axios";
import { Send, Tag, Type, FileText, Loader2, X } from "lucide-react";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/api/posts",
        {
          title,
          body,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostCreated();
      setTitle("");
      setBody("");
      setTags("");
      setShowForm(false);
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  // Convert comma-separated tags to array of tag elements
  const renderTagPreviews = () => {
    if (!tags.trim()) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
          .map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
      </div>
    );
  };

  if (!showForm) {
    return (
      <div
        onClick={() => setShowForm(true)}
        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center text-gray-600">
          <FileText size={18} className="mr-3 text-blue-500" />
          <span className="text-gray-500">
            Share something with the community...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Create a Post</h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Post title"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={posting}
            />
          </div>
        </div>

        <div>
          <textarea
            placeholder="What would you like to share?"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[120px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={posting}
          ></textarea>
        </div>

        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={posting}
            />
          </div>
          {renderTagPreviews()}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            disabled={posting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors disabled:opacity-70"
            disabled={posting}
          >
            {posting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
