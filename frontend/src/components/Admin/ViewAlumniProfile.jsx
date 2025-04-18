import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewAlumniProfile = () => {
  const { id } = useParams();
  const [alum, setAlum] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/admin/alumni/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlum(res.data);
    };
    fetchAlumni();
  }, [id]);

  if (!alum) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{alum.name}'s Profile</h2>
      <p>
        <strong>Email:</strong> {alum.email}
      </p>
      <p>
        <strong>Batch:</strong> {alum.batch}
      </p>
      <p>
        <strong>Branch:</strong> {alum.branch}
      </p>
      <p>
        <strong>Job Title:</strong> {alum.jobTitle}
      </p>
      <p>
        <strong>Company:</strong> {alum.company}
      </p>
      <p>
        <strong>Location:</strong> {alum.location}
      </p>
      <p>
        <strong>LinkedIn:</strong>{" "}
        <a href={alum.linkedIn} className="text-blue-500 underline">
          {alum.linkedIn}
        </a>
      </p>
      <p>
        <strong>Bio:</strong> {alum.bio}
      </p>
    </div>
  );
};

export default ViewAlumniProfile;
