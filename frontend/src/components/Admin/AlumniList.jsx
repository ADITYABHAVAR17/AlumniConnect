import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  User,
  ChevronRight,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [animateIndex, setAnimateIndex] = useState(-1);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/alumni", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumni(res.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleVerify = async (id, index) => {
    setAnimateIndex(index);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/admin/alumni/verify/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlumni((prev) =>
        prev.map((a) => (a._id === id ? { ...a, isVerified: true } : a))
      );
      setTimeout(() => setAnimateIndex(-1), 1000);
    } catch (error) {
      console.error("Error verifying alumni:", error);
      setAnimateIndex(-1);
    }
  };

  const filteredAlumni = alumni
    .filter((alum) => {
      if (filter === "verified") return alum.isVerified;
      if (filter === "unverified") return !alum.isVerified;
      return true;
    })
    .filter((alum) => {
      if (!searchTerm) return true;
      return (
        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Alumni Directory</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {alumni.length} {alumni.length === 1 ? "Member" : "Members"}
          </span>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-all"
            onClick={fetchAlumni}
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin text-indigo-600" : "text-gray-500"}
            />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search alumni by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-1/2">
          <div className="relative w-full sm:w-1/2">
            <Filter
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Alumni</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>

          <select
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading alumni data...</p>
        </div>
      ) : filteredAlumni.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <User size={48} className="mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-700">No alumni found</h3>
          <p className="text-gray-500">
            {searchTerm ? "Try adjusting your search criteria" : "No alumni records available"}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredAlumni.map((alum, index) => (
            <li
              key={alum._id}
              className={`py-4 transition-all duration-300 hover:bg-gray-50 ${
                animateIndex === index ? "animate-pulse bg-green-50" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div className="flex items-start sm:items-center w-full sm:w-auto">
                  <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {alum.name.charAt(0)}
                  </div>
                  <div className="ml-4 text-sm break-words">
                    <p className="font-semibold text-gray-800 truncate w-full sm:w-auto">
                      {alum.name}
                    </p>
                    <p className="text-sm text-gray-600 break-all">{alum.email}</p>
                    {alum.graduationYear && (
                      <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        Class of {alum.graduationYear}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {!alum.isVerified ? (
                    <button
                      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-white rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1"
                      onClick={() => handleVerify(alum._id, index)}
                    >
                      <CheckCircle size={16} />
                      <span>Verify</span>
                    </button>
                  ) : (
                    <span className="flex items-center justify-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg">
                      <CheckCircle size={16} />
                      <span>Verified</span>
                    </span>
                  )}

                  <Link
                    to={`/admin/dashboard/view-alumni/${alum._id}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <span>View</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {!loading && filteredAlumni.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Showing <span className="font-medium">{filteredAlumni.length}</span> of{" "}
            <span className="font-medium">{alumni.length}</span> alumni
          </p>
          {/* <div className="flex flex-wrap justify-center gap-2">
            <button disabled className="px-3 py-1 border rounded bg-gray-100 text-gray-400">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-indigo-600 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default AlumniList;
