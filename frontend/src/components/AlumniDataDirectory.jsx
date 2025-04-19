import React, { useEffect, useState } from "react";
import axios from "axios";

function AlumniDataDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [filters, setFilters] = useState({
    batch: "",
    branch: "",
    jobTitle: "",
    location: "",
  });

  const fetchAlumni = async (filterQuery = "") => {
    try {
      const res = await axios.get(`/api/alumni/data/?${filterQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAlumni(res.data);
    } catch (error) {
      console.error("Error fetching alumni data:", error.message);
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
    const query = new URLSearchParams(filters).toString();
    fetchAlumni(query);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Verified Alumni Directory</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="batch"
          value={filters.batch}
          onChange={handleChange}
          placeholder="Batch"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="branch"
          value={filters.branch}
          onChange={handleChange}
          placeholder="Branch"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />
      </div>

      <button onClick={handleFilter} className="btn btn-primary mb-6">
        Apply Filters
      </button>

      {/* Alumni List */}
      <div className="grid gap-4">
        {alumni.length === 0 && <p>No alumni found.</p>}
        {alumni.map((user) => (
          <div key={user._id} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm text-gray-600">
              {user.jobTitle} at {user.company}
            </p>
            <p className="text-sm">
              {user.batch} • {user.branch}
            </p>
            <p className="text-sm">{user.location}</p>
            {user.linkedIn && (
              <a
                href={user.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlumniDataDirectory;
