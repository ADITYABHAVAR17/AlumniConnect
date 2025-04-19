import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  Award,
  MapPin,
  Bookmark,
  ExternalLink,
  Search,
} from "lucide-react";
import axios from "axios";

function AlumniHomepage() {
  const [stats, setStats] = useState({
    totalAlumni: 0,
    upcomingEvents: 0,
    newPosts: 0,
    connections: 0,
  });

  const [events, setEvents] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState({
    stats: true,
    events: true,
    discussions: true,
    updates: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Get auth token
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch dashboard stats
    axios
      .get("/api/alumni/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, stats: false }));
      });

    // Fetch upcoming events
    axios
      .get("/api/events", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 3, upcoming: true },
      })
      .then((res) => {
        console.log("Events API response:", res.data); // Debug log
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, events: false }));
      });

    // Fetch recent discussions
    axios
      .get("/api/community/posts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 3, sort: "recent" },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDiscussions(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setDiscussions([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching discussions:", err);
        setDiscussions([]);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, discussions: false }));
      });

    // Fetch university updates
    axios
      .get("/api/updates", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 1 },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUpdates(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setUpdates([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching university updates:", err);
        setUpdates([]);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, updates: false }));
      });
  }, [token]);

  // Handle search functionality
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (searchQuery.trim().length >= 3) {
        performSearch();
      } else {
        setSearchResults(null);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const performSearch = async () => {
    setSearchLoading(true);
    try {
      const res = await axios.get("/api/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: searchQuery },
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error("Error performing search:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format time to readable string
  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(dateString).toLocaleTimeString("en-US", options);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-8">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to the Alumni Network
          </h1>
          <p className="text-indigo-100 mb-6 max-w-2xl">
            Connect with fellow graduates, discover opportunities, and stay
            updated with university news and events.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/alumni/dashboard/directory"
              className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              <Users size={18} className="mr-2" />
              Find Alumni
            </Link>
            <Link
              to="/alumni/dashboard/events"
              className="inline-flex items-center px-4 py-2 bg-indigo-800 bg-opacity-50 text-white rounded-lg font-medium hover:bg-opacity-70 transition-colors"
            >
              <Calendar size={18} className="mr-2" />
              Browse Events
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full"
          >
            <circle cx="75" cy="50" r="20" fill="white" />
            <circle cx="25" cy="30" r="10" fill="white" />
            <circle cx="40" cy="70" r="15" fill="white" />
          </svg>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search alumni, events, or discussions..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="mt-4 bg-white border border-gray-100 rounded-lg shadow-lg">
            {searchResults.alumni && searchResults.alumni.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">Alumni</h3>
                <ul className="space-y-2">
                  {searchResults.alumni.slice(0, 3).map((person) => (
                    <li key={person.id} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-2">
                        {person.name.charAt(0).toUpperCase()}
                      </div>
                      <Link
                        to={`/alumni/${person.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {person.name} - {person.batch}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {searchResults.events && searchResults.events.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">Events</h3>
                <ul className="space-y-2">
                  {searchResults.events.slice(0, 2).map((event) => (
                    <li key={event.id}>
                      <Link
                        to={`/events/${event.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {event.title} - {formatDate(event.date)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {searchResults.posts && searchResults.posts.length > 0 && (
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2">Discussions</h3>
                <ul className="space-y-2">
                  {searchResults.posts.slice(0, 2).map((post) => (
                    <li key={post.id}>
                      <Link
                        to={`/community/${post.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {searchLoading && (
              <div className="p-4 text-center">
                <div className="animate-pulse flex justify-center">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>
            )}

            {!searchLoading &&
              !searchResults.alumni?.length &&
              !searchResults.events?.length &&
              !searchResults.posts?.length && (
                <div className="p-4 text-center text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              )}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Alumni Network
              </p>
              {loading.stats ? (
                <div className="animate-pulse h-7 w-16 bg-gray-200 rounded mt-1"></div>
              ) : (
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalAlumni?.toLocaleString() || 0}
                </h3>
              )}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Upcoming Events
              </p>
              {loading.stats ? (
                <div className="animate-pulse h-7 w-10 bg-gray-200 rounded mt-1"></div>
              ) : (
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.upcomingEvents || 0}
                </h3>
              )}
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Calendar size={24} className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                New Discussions
              </p>
              {loading.stats ? (
                <div className="animate-pulse h-7 w-10 bg-gray-200 rounded mt-1"></div>
              ) : (
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.newPosts || 0}
                </h3>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MessageSquare size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Your Connections
              </p>
              {loading.stats ? (
                <div className="animate-pulse h-7 w-10 bg-gray-200 rounded mt-1"></div>
              ) : (
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.connections || 0}
                </h3>
              )}
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Upcoming Events
              </h2>
              <Link
                to="events"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                View All <ExternalLink size={14} className="ml-1" />
              </Link>
            </div>
            <div>
              {loading.events ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="p-6 border-b border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-gray-100 rounded-lg p-3 mr-4 min-w-[60px] animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5 mb-3 animate-pulse"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="bg-indigo-100 rounded-lg p-3 mr-4 text-center min-w-[60px]">
                        <div className="text-xl font-bold text-indigo-800">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-indigo-600">
                          {new Date(event.date).toLocaleString("default", {
                            month: "short",
                          })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(event.date)} • {formatTime(event.date)}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin size={14} className="mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex -space-x-2 mr-2">
                              {Array.from({
                                length: Math.min(
                                  3,
                                  event.attendees_preview?.length || 0
                                ),
                              }).map((_, i) => (
                                <div
                                  key={i}
                                  className="h-6 w-6 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-transparent flex items-center justify-center text-xs text-white"
                                >
                                  {event.attendees_preview?.[i]?.name
                                    .charAt(0)
                                    .toUpperCase() || ""}
                                </div>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {event.attendees_count || 0} attending
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors">
                              <Bookmark size={16} />
                            </button>
                            <Link
                              to={`events/${event.id}`}
                              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-sm hover:bg-indigo-100 transition-colors"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No upcoming events found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Discussions Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Discussions
              </h2>
              <Link
                to="community"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                View All <ExternalLink size={14} className="ml-1" />
              </Link>
            </div>
            <div>
              {loading.discussions ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-4 border-b border-gray-100">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))
              ) : Array.isArray(discussions) && discussions.length > 0 ? (
                discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <Link to={`community/${discussion.id}`} className="block">
                      <h3 className="text-base font-medium text-gray-800 mb-1 line-clamp-2 hover:text-indigo-600">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>By {discussion.author?.name || "Unknown"}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(discussion.created_at)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <div className="flex items-center mr-3">
                          <MessageSquare size={14} className="mr-1" />
                          {discussion.comments_count || 0} comments
                        </div>
                        <div className="flex items-center">
                          <Award size={14} className="mr-1" />
                          {discussion.likes_count || 0} likes
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No discussions found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* University News Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            University Updates
          </h2>
        </div>
        <div className="p-6">
          {loading.updates ? (
            <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <div className="flex items-start">
                <div className="bg-gray-200 rounded-full p-2 mr-4 h-10 w-10"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ) : Array.isArray(updates) && updates.length > 0 ? (
            updates.map((update) => (
              <div
                key={update.id}
                className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start"
              >
                <div className="bg-indigo-100 rounded-full p-2 mr-4">
                  <Bell size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {update.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{update.content}</p>
                  {update.link && (
                    <Link
                      to={update.link.url}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center w-max"
                    >
                      {update.link.text}{" "}
                      <ExternalLink size={14} className="ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No university updates available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlumniHomepage;
