import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { Loader2, RefreshCw, AlertCircle, Filter, ArrowUp } from "lucide-react";

function FeedList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const feedRef = useRef(null);

  const fetchPosts = async () => {
    try {
      setError(null);
      if (!refreshing) setLoading(true);

      const res = await axios.get("/api/posts");
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get all unique tags from posts
  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  // Filter posts by tag if filter is active
  const filteredPosts = filterTag
    ? posts.filter((post) => post.tags && post.tags.includes(filterTag))
    : posts;

  useEffect(() => {
    fetchPosts();

    // Add scroll listener to show/hide scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={feedRef}
      className="max-w-2xl mx-auto pt-4 pb-16 px-4 sm:px-0 relative"
    >
      {/* Create Post Component */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-white via-white to-transparent pb-4 pt-1">
        <CreatePost onPostCreated={fetchPosts} />
      </div>

      {/* Header Section with Filters */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-gray-800">Recent Posts</h2>
          {filterTag && (
            <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {filterTag}
              <button
                onClick={() => setFilterTag("")}
                className="ml-1 text-blue-700 hover:text-blue-900"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`p-2 rounded-full ${
                filterOpen || filterTag
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
              title="Filter posts by tag"
            >
              <Filter size={16} />
            </button>

            {filterOpen && allTags.length > 0 && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 max-h-64 overflow-y-auto">
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Filter by Tag
                </div>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filterTag === tag
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setFilterTag(tag);
                      setFilterOpen(false);
                    }}
                  >
                    # {tag}
                  </button>
                ))}
                {filterTag && (
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
                    onClick={() => {
                      setFilterTag("");
                      setFilterOpen(false);
                    }}
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition-colors p-2 rounded-full hover:bg-gray-100"
            title="Refresh posts"
          >
            <RefreshCw
              size={16}
              className={`${refreshing ? "animate-spin" : ""}`}
            />
            <span className="sr-only">Refresh</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && !refreshing ? (
        <div className="flex flex-col items-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-pulse"></div>
            <Loader2
              className="animate-spin text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              size={24}
            />
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start shadow-sm">
          <AlertCircle
            className="text-red-500 mr-3 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div>
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center shadow-sm border border-blue-100">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
            {filterTag ? <Filter size={24} /> : <AlertCircle size={24} />}
          </div>
          {filterTag ? (
            <>
              <p className="text-gray-700 font-medium mb-2">
                No posts with tag: #{filterTag}
              </p>
              <button
                onClick={() => setFilterTag("")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filter
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700 font-medium mb-2">No posts yet.</p>
              <p className="text-gray-600">
                Be the first to share something with the community!
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div
            className="space-y-4 relative"
            style={{
              perspective: "1000px",
            }}
          >
            {filteredPosts.map((post, index) => (
              <div
                key={post._id}
                className="transform transition-all hover:scale-[1.01] hover:shadow-md"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "0.3s",
                  animationFillMode: "both",
                  animationName: "slideIn",
                  transformOrigin: "center top",
                }}
              >
                <PostCard post={post} onDelete={fetchPosts} />
              </div>
            ))}
          </div>

          {/* Show post count when filtered */}
          {filterTag && filteredPosts.length > 0 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"} with tag: #
              {filterTag}
            </div>
          )}
        </>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-30"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Loading overlay when refreshing */}
      {refreshing && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center">
          <Loader2 className="animate-spin mr-2" size={16} />
          <span>Refreshing...</span>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default FeedList;
