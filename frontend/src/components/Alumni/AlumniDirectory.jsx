import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  ArrowUpDown,
} from "lucide-react";

function AlumniDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ role: "", verificationStatus: "" });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/alumni")
      .then((res) => {
        setAlumni(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
        setLoading(false);
      });
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter and sort alumni data
  const filteredAlumni = alumni
    .filter((alum) => {
      const matchesSearch =
        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = filter.role ? alum.role === filter.role : true;
      const matchesVerification =
        filter.verificationStatus === "verified"
          ? alum.isVerified
          : filter.verificationStatus === "unverified"
          ? !alum.isVerified
          : true;

      return matchesSearch && matchesRole && matchesVerification;
    })
    .sort((a, b) => {
      // Handle different sorting fields
      if (sortBy === "name") {
        const aValue = a.name.toLowerCase();
        const bValue = b.name.toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (sortBy === "createdAt") {
        const aValue = new Date(a.createdAt);
        const bValue = new Date(b.createdAt);
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else if (sortBy === "email") {
        const aValue = a.email.toLowerCase();
        const bValue = b.email.toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  // Get unique values for filters
  const roles = [...new Set(alumni.map((a) => a.role))];

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilter({ role: "", verificationStatus: "" });
  };

  // Generate random colors for avatars
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-yellow-100 text-yellow-600",
      "bg-red-100 text-red-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Alumni Directory</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
            {filteredAlumni.length} alumni found
          </div>
          <button
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition-colors"
            onClick={() => {
              /* Export functionality would go here */
            }}
          >
            Export Directory
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full">
            <Filter size={16} className="text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <select
            className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filter.role}
            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filter.verificationStatus}
            onChange={(e) =>
              setFilter({ ...filter, verificationStatus: e.target.value })
            }
          >
            <option value="">All Verification Status</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>

          {(searchTerm || filter.role || filter.verificationStatus) && (
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Sorting controls */}
      <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-200 pb-3">
        <button
          onClick={() => toggleSort("name")}
          className={`flex items-center text-sm font-medium px-3 py-1 rounded ${
            sortBy === "name"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Name
          {sortBy === "name" && <ArrowUpDown size={16} className="ml-1" />}
        </button>
        <button
          onClick={() => toggleSort("email")}
          className={`flex items-center text-sm font-medium px-3 py-1 rounded ${
            sortBy === "email"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Email
          {sortBy === "email" && <ArrowUpDown size={16} className="ml-1" />}
        </button>
        <button
          onClick={() => toggleSort("createdAt")}
          className={`flex items-center text-sm font-medium px-3 py-1 rounded ${
            sortBy === "createdAt"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Join Date
          {sortBy === "createdAt" && <ArrowUpDown size={16} className="ml-1" />}
        </button>
      </div>

      {/* Alumni grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredAlumni.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-3">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No alumni found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alum) => (
            <div
              key={alum._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-6"></div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl uppercase mr-3 ${getAvatarColor(
                        alum.name
                      )}`}
                    >
                      {alum.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {alum.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <User size={14} className="mr-1" />
                        <span className="capitalize">{alum.role}</span>
                      </div>
                    </div>
                  </div>
                  {alum.isVerified ? (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      <CheckCircle size={14} className="mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      <XCircle size={14} className="mr-1" />
                      Pending
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-3 text-gray-700">
                  <div className="truncate">
                    <span className="font-medium break-all">{alum.email}</span>
                  </div>
                </div>

                <div className="flex items-center mb-4 text-gray-600 text-sm">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span>Joined on {formatDate(alum.createdAt)}</span>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <Link
                    to={`/alumni/dashboard/directory/${alum._id}`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/alumni/dashboard/chat/${alum._id}`}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <MessageSquare size={16} className="mr-1" />
                    Message
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredAlumni.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white">
              1
            </button>
            <button
              className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
              disabled={filteredAlumni.length <= 9}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default AlumniDirectory;
