import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AlumniList() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    axios
      .get("/api/alumni")
      .then((res) => setAlumni(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Alumni Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alumni.map((a) => (
          <Link
            key={a._id}
            to={`/alumni/${a._id}`}
            className="border p-4 rounded shadow hover:bg-gray-50"
          >
            <h3 className="font-semibold">{a.name}</h3>
            <p>
              {a.jobTitle} at {a.company}
            </p>
            <p className="text-sm text-gray-600">
              {a.batch} • {a.branch}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
