import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Filter,
  Loader,
  ChevronLeft,
  ChevronRight,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

function AlumniDataDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    batch: "",
    branch: "",
    jobTitle: "",
    location: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [alumniPerPage] = useState(9);
  const [totalAlumni, setTotalAlumni] = useState(0);

  const fetchAlumni = async (query = "") => {
    setLoading(true);
    try {
      const url = query ? `/api/data/?${query}` : `/api/data/`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAlumni(res.data);
      setTotalAlumni(res.data.length);
      setCurrentPage(1); // Reset to first page when new data is fetched
    } catch (error) {
      console.error("Error fetching alumni data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all alumni initially
    fetchAlumni();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    // Filter out empty values
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );
    const query = new URLSearchParams(nonEmptyFilters).toString();
    fetchAlumni(query);
  };

  const resetFilters = () => {
    setFilters({
      batch: "",
      branch: "",
      jobTitle: "",
      location: "",
    });
    fetchAlumni();
  };

  // Get unique values for dropdowns
  const uniqueBatches = [
    ...new Set(alumni.filter((a) => a.batch).map((a) => a.batch)),
  ].sort((a, b) => b - a); // Sort batches in descending order

  const uniqueBranches = [
    ...new Set(alumni.filter((a) => a.branch).map((a) => a.branch)),
  ].sort();

  const uniqueJobTitles = [
    ...new Set(alumni.filter((a) => a.jobTitle).map((a) => a.jobTitle)),
  ].sort();

  const uniqueLocations = [
    ...new Set(alumni.filter((a) => a.location).map((a) => a.location)),
  ].sort();

  // Pagination logic
  const indexOfLastAlumni = currentPage * alumniPerPage;
  const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
  const currentAlumni = alumni.slice(indexOfFirstAlumni, indexOfLastAlumni);
  const totalPages = Math.ceil(alumni.length / alumniPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center">
                  <GraduationCap className="mr-3" size={32} />
                  Alumni Directory
                </h2>
                <p className="mt-2 opacity-90">
                  Connect with graduates from our institution
                </p>
              </div>
              <div className="hidden md:flex items-center bg-white/20 px-4 py-2 rounded-lg text-white backdrop-blur-sm">
                <Users className="mr-2" size={20} />
                <span className="font-medium">{totalAlumni} Alumni</span>
              </div>
            </div>
          </div>

          {/* Search & Filters Section */}
          <div className="p-6 bg-white border-b">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
                <div className="ml-4 flex items-center text-gray-500 text-sm">
                  <Filter size={16} className="mr-1" />
                  <span>
                    {Object.values(filters).filter((v) => v !== "").length}{" "}
                    active filters
                  </span>
                </div>
              </div>

              <div className="flex md:justify-end items-center w-full md:w-auto">
                <span className="text-gray-500 text-sm mr-3">
                  Showing {indexOfFirstAlumni + 1}-
                  {Math.min(indexOfLastAlumni, totalAlumni)} of {totalAlumni}
                </span>
              </div>
            </div>

            {/* Filters */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Batch
                  </label>
                  <select
                    name="batch"
                    value={filters.batch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-700"
                  >
                    <option value="">All Batches</option>
                    {uniqueBatches.map((batch) => (
                      <option key={batch} value={batch}>
                        {batch}
                      </option>
                    ))}
                  </select>
                  <Calendar
                    size={16}
                    className="absolute right-3 top-9 text-gray-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={filters.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-700"
                  >
                    <option value="">All Branches</option>
                    {uniqueBranches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                  <GraduationCap
                    size={16}
                    className="absolute right-3 top-9 text-gray-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Job Title
                  </label>
                  <select
                    name="jobTitle"
                    value={filters.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-700"
                  >
                    <option value="">All Job Titles</option>
                    {uniqueJobTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                  <Briefcase
                    size={16}
                    className="absolute right-3 top-9 text-gray-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-700"
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <MapPin
                    size={16}
                    className="absolute right-3 top-9 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={handleFilter}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all font-medium"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Alumni List */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader size={36} className="animate-spin text-indigo-600" />
                <span className="ml-3 text-gray-600">
                  Loading alumni data...
                </span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentAlumni.length === 0 && (
                    <div className="col-span-3 text-center py-16 text-gray-500">
                      <Search className="mx-auto mb-4" size={48} />
                      <p className="text-lg">
                        No alumni found matching your criteria.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}

                  {currentAlumni.map((user, index) => (
                    <div
                      key={user._id}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-800">
                          {user.name}
                        </h3>

                        {/* Show job details if available */}
                        {(user.jobTitle || user.company) && (
                          <div className="flex items-start mt-3">
                            <Briefcase
                              size={18}
                              className="mt-0.5 mr-2 text-indigo-500"
                            />
                            <p className="text-gray-700">
                              {user.jobTitle ? user.jobTitle : ""}
                              {user.jobTitle && user.company ? " at " : ""}
                              {user.company ? (
                                <span className="font-medium">
                                  {user.company}
                                </span>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        )}

                        {/* Show batch & branch if available */}
                        {(user.batch || user.branch) && (
                          <div className="flex items-start mt-2">
                            <GraduationCap
                              size={18}
                              className="mt-0.5 mr-2 text-indigo-500"
                            />
                            <p className="text-gray-700">
                              {user.batch ? `Batch ${user.batch}` : ""}
                              {user.batch && user.branch ? " • " : ""}
                              {user.branch ? user.branch : ""}
                            </p>
                          </div>
                        )}

                        {/* Show location if available */}
                        {user.location && (
                          <div className="flex items-start mt-2">
                            <MapPin
                              size={18}
                              className="mt-0.5 mr-2 text-indigo-500"
                            />
                            <p className="text-gray-700">{user.location}</p>
                          </div>
                        )}

                        {/* Connect buttons */}
                        <div className="mt-4 flex gap-2">
                          {user.linkedIn && (
                            <a
                              href={user.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                              LinkedIn
                            </a>
                          )}

                          <Link
                            to={`/directory/${user._id}`}
                            className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-lg text-sm hover:bg-indigo-200 transition-colors"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {alumni.length > 0 && (
                  <div className="mt-8 flex justify-center items-center">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        }`}
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {/* Page numbers */}
                      {[...Array(totalPages)].map((_, index) => {
                        // Show limited page numbers for better UI
                        if (
                          index + 1 === 1 || // Always show first page
                          index + 1 === totalPages || // Always show last page
                          (index + 1 >= currentPage - 1 &&
                            index + 1 <= currentPage + 1) // Show current page and adjacent pages
                        ) {
                          return (
                            <button
                              key={index}
                              onClick={() => paginate(index + 1)}
                              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                                currentPage === index + 1
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                              }`}
                            >
                              {index + 1}
                            </button>
                          );
                        } else if (
                          (index + 1 === 2 && currentPage > 3) ||
                          (index + 1 === totalPages - 1 &&
                            currentPage < totalPages - 2)
                        ) {
                          // Show ellipsis
                          return (
                            <span
                              key={index}
                              className="flex items-center justify-center w-10 h-10 text-gray-400"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        }`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniDataDirectory;
