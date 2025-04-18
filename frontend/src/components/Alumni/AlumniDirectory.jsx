import React, { useEffect, useState } from "react";
import axios from "axios";

function AlumniDirectory() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    axios.get("/api/alumni").then((res) => setAlumni(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Alumni Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alumni.map((alum) => (
          <div key={alum._id} className="border rounded p-4 shadow">
            <h3 className="font-semibold">{alum.name}</h3>
            <p>
              {alum.jobTitle} @ {alum.company}
            </p>
            <p className="text-sm">
              {alum.batch} • {alum.branch}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlumniDirectory;
