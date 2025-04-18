import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/alumni/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
      <p>
        {profile.jobTitle} at {profile.company}
      </p>
      <p>{profile.location}</p>
      <p>
        {profile.batch} - {profile.branch}
      </p>
      <p>{profile.bio}</p>
      <a
        href={profile.linkedIn}
        className="text-blue-600 underline"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}

export default ViewProfile;
