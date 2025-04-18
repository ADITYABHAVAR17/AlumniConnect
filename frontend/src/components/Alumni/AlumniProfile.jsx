import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AlumniProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/alumni/${id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p>
        {profile.jobTitle} at {profile.company}
      </p>
      <p>{profile.location}</p>
      <p>
        {profile.batch} • {profile.branch}
      </p>
      <p className="mt-2">{profile.bio}</p>
      <a
        href={profile.linkedIn}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline"
      >
        LinkedIn
      </a>
    </div>
  );
}
