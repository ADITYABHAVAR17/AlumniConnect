import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import {
  Loader2,
  RefreshCw,
  AlertCircle,
  Filter,
  ArrowUp,
  Search,
  Plus,
  Briefcase,
  CalendarDays,
  TrendingUp,
  MessageSquare,
  Users,
  Calendar,
  ChevronDown,
  CheckCircle,
  PlusCircle,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Category color mapping
const CATEGORIES = [
  { id: "all", name: "All Posts", icon: <MessageSquare size={16} /> },
  {
    id: "announcement",
    name: "Announcements",
    color: "bg-blue-500",
    icon: <AlertCircle size={16} />,
  },
  {
    id: "event",
    name: "Events",
    color: "bg-purple-500",
    icon: <Calendar size={16} />,
  },
  {
    id: "job",
    name: "Job Opportunities",
    color: "bg-green-500",
    icon: <Briefcase size={16} />,
  },
  {
    id: "question",
    name: "Questions",
    color: "bg-yellow-500",
    icon: <MessageSquare size={16} />,
  },
  {
    id: "discussion",
    name: "Discussions",
    color: "bg-indigo-500",
    icon: <Users size={16} />,
  },
];

// Sample graduation years for filtering
const GRADUATION_YEARS = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);

// Sample professions for filtering
const PROFESSIONS = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Marketing",
  "Finance",
  "HR",
  "Entrepreneur",
  "Student",
];

function Forums() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSortMethod, setActiveSortMethod] = useState("recent");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const feedRef = useRef(null);

  // Advanced filtering
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [filterGradYear, setFilterGradYear] = useState("");
  const [filterProfession, setFilterProfession] = useState("");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState("");

  const fetchPosts = async () => {
    try {
      setError(null);
      if (!refreshing) setLoading(true);

      // In a real app, you'd pass filters to the API
      // For this example, we're simulating it with client-side filtering
      const res = await axios.get("/api/posts");
      setPosts(res.data);
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

  // Filter and sort posts
  const getFilteredAndSortedPosts = () => {
    let result = [...posts];

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory);
    }

    // Apply tag filter
    if (filterTag) {
      result = result.filter(
        (post) => post.tags && post.tags.includes(filterTag)
      );
    }

    // Apply graduation year filter
    if (filterGradYear) {
      result = result.filter(
        (post) => post.author?.graduationYear === filterGradYear
      );
    }

    // Apply profession filter
    if (filterProfession) {
      result = result.filter(
        (post) => post.author?.jobTitle === filterProfession
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title?.toLowerCase().includes(query) ||
          post.body?.toLowerCase().includes(query) ||
          post.author?.name?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (activeSortMethod) {
      case "recent":
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "popular":
        return result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case "comments":
        return result.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
      default:
        return result;
    }
  };

  const filteredPosts = getFilteredAndSortedPosts();

  // Toggle filter dropdown
  const toggleFilterDropdown = (dropdown) => {
    if (filterDropdownOpen === dropdown) {
      setFilterDropdownOpen("");
    } else {
      setFilterDropdownOpen(dropdown);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilterTag("");
    setFilterGradYear("");
    setFilterProfession("");
    setSearchQuery("");
    setActiveCategory("all");
  };

  // Check if any filter is active
  const isFilterActive =
    filterTag ||
    filterGradYear ||
    filterProfession ||
    searchQuery ||
    activeCategory !== "all";

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
    <div className="bg-gray-50 min-h-screen">
      <div
        ref={feedRef}
        className="max-w-4xl mx-auto pt-6 pb-20 px-4 sm:px-6 relative"
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Community Feed
            </h1>
            <p className="text-gray-600 mt-1">
              Connect, share, and grow with fellow alumni and students
            </p>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, topics, or people..."
                className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery("")}
                >
                  <span className="text-gray-400 hover:text-gray-600">✕</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center overflow-x-auto px-2 py-1.5 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-3 py-1.5 mx-1 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters & Sorting */}
        <div className="relative">
          <button
            onClick={() => toggleFilterDropdown("tag")}
            className={`inline-flex items-center px-3 py-2 text-sm border ${
              filterDropdownOpen === "tag"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : filterTag
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            } rounded-lg shadow-sm transition-colors`}
          >
            <Tag size={16} className="mr-1.5" />
            {filterTag || "Tag"}
            <ChevronDown size={16} className="ml-1.5" />
          </button>

          {filterDropdownOpen === "tag" && allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-1 left-0 z-30 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto"
            >
              <button
                onClick={() => {
                  setFilterTag("");
                  setFilterDropdownOpen("");
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                All Tags
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setFilterTag(tag);
                    setFilterDropdownOpen("");
                  }}
                  className={`flex w-full items-center px-4 py-2 text-sm ${
                    filterTag === tag
                      ? "bg-gray-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  # {tag}
                  {filterTag === tag && (
                    <CheckCircle size={14} className="ml-auto" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Active Filter Pills */}
        {isFilterActive && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeCategory !== "all" && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm">
                Category:{" "}
                {CATEGORIES.find((c) => c.id === activeCategory)?.name}
                <button
                  onClick={() => setActiveCategory("all")}
                  className="ml-1.5 hover:text-blue-900"
                >
                  ✕
                </button>
              </div>
            )}

            {filterTag && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm">
                Tag: {filterTag}
                <button
                  onClick={() => setFilterTag("")}
                  className="ml-1.5 hover:text-blue-900"
                >
                  ✕
                </button>
              </div>
            )}

            {filterGradYear && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm">
                Class of {filterGradYear}
                <button
                  onClick={() => setFilterGradYear("")}
                  className="ml-1.5 hover:text-blue-900"
                >
                  ✕
                </button>
              </div>
            )}

            {filterProfession && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm">
                Profession: {filterProfession}
                <button
                  onClick={() => setFilterProfession("")}
                  className="ml-1.5 hover:text-blue-900"
                >
                  ✕
                </button>
              </div>
            )}

            {searchQuery && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1.5 hover:text-blue-900"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && !refreshing ? (
          <div className="flex flex-col items-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-blue-200 animate-pulse"></div>
              <Loader2
                className="animate-spin text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                size={28}
              />
            </div>
            <p className="text-gray-700 mt-4 font-medium">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start shadow-sm">
            <AlertCircle
              className="text-red-500 mr-4 flex-shrink-0 mt-0.5"
              size={24}
            />
            <div>
              <p className="text-red-700 font-medium text-lg">{error}</p>
              <p className="text-red-600 mt-1">
                We're having trouble loading your community feed.
              </p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center shadow-sm border border-blue-100">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              {isFilterActive ? (
                <Filter size={32} />
              ) : (
                <AlertCircle size={32} />
              )}
            </div>
            {isFilterActive ? (
              <>
                <p className="text-gray-700 font-medium text-xl mb-2">
                  No matching posts found
                </p>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more posts
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-700 font-medium text-xl mb-2">
                  No posts yet
                </p>
                <p className="text-gray-600 mb-6">
                  Be the first to share something with the community!
                </p>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                >
                  <PlusCircle size={16} className="mr-2" />
                  Create a post
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Posts Grid with Advanced Animation */}
            <div className="relative">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    className="mb-4 "
                  >
                    <PostCard post={post} onDelete={fetchPosts} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Results counter */}
            {isFilterActive && filteredPosts.length > 0 && (
              <div className="mt-4 text-center text-sm text-gray-500">
                Showing {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "post" : "posts"}
              </div>
            )}
          </>
        )}

        {/* Create Post Modal */}
        <AnimatePresence>
          {showCreatePost && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowCreatePost(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-x-4 top-20 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    Create a New Post
                  </h3>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        placeholder="Add a title for your post"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a category</option>
                        {CATEGORIES.filter((c) => c.id !== "all").map(
                          (category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Content
                      </label>
                      <textarea
                        id="content"
                        rows={4}
                        placeholder="What would you like to share?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>

                    <div>
                      <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tags (separated by commas)
                      </label>
                      <input
                        type="text"
                        id="tags"
                        placeholder="networking, jobs, advice"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCreatePost(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-30"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading overlay when refreshing */}
        <AnimatePresence>
          {refreshing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center"
            >
              <Loader2 className="animate-spin mr-2" size={16} />
              <span>Refreshing feed...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        /* Hide scrollbar but allow scrolling */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Advanced animation keyframes */
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Forums;
