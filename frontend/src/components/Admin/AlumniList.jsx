import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/alumni", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumni(res.data);
    };
    fetchAlumni();
  }, []);

  const handleVerify = async (id) => {
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
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Alumni List</h2>
      <ul>
        {alumni.map((alum) => (
          <li key={alum._id} className="border-b py-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{alum.name}</p>
                <p className="text-sm text-gray-600">{alum.email}</p>
              </div>
              <div>
                {!alum.isVerified ? (
                  <button
                    className="bg-green-500 px-3 py-1 text-white rounded"
                    onClick={() => handleVerify(alum._id)}
                  >
                    Verify
                  </button>
                ) : (
                  <span className="text-green-600">Verified</span>
                )}
                <Link
                  to={`/admin/dashboard/view-alumni/${alum._id}`}
                  className="ml-4 text-blue-600 underline"
                >
                  View
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlumniList;
