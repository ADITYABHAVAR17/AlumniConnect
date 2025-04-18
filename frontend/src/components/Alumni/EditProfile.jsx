import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    batch: "",
    branch: "",
    jobTitle: "",
    company: "",
    location: "",
    bio: "",
    linkedIn: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/alumni/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Check if the response contains all fields
        setForm({
          ...form,
          ...res.data,
        });
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/alumni/me", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!form.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="batch"
          placeholder="Batch"
          value={form.batch}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="linkedIn"
          placeholder="LinkedIn URL"
          value={form.linkedIn}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Update
        </button>
      </form>
    </div>
  );
}
