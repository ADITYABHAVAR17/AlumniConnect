import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Calendar,
  BookOpen,
  Briefcase,
  Building,
  MapPin,
  Linkedin,
  FileText,
  Loader2,
  Save,
} from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/alumni/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setForm({
          ...form,
          ...res.data,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put("/api/alumni/me", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Show success toast/notification
      const notification = document.getElementById("notification");
      notification.classList.remove("hidden");
      notification.classList.add(
        "bg-green-100",
        "border-green-500",
        "text-green-700"
      );
      notification.textContent = "Profile updated successfully!";

      setTimeout(() => {
        notification.classList.add("hidden");
      }, 3000);
    } catch (err) {
      // Show error toast/notification
      const notification = document.getElementById("notification");
      notification.classList.remove("hidden");
      notification.classList.add(
        "bg-red-100",
        "border-red-500",
        "text-red-700"
      );
      notification.textContent = "Failed to update profile.";

      setTimeout(() => {
        notification.classList.add("hidden");
      }, 3000);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-600 mr-2" size={24} />
        <span className="text-lg text-gray-700">Loading profile data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div
        id="notification"
        className="hidden mb-4 px-4 py-3 rounded border fixed top-5 right-5 shadow-md z-50 transition-all duration-300"
      ></div>

      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Edit Your Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="batch"
              className="block text-sm font-medium text-gray-700"
            >
              Batch Year
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                id="batch"
                name="batch"
                placeholder="Graduation year"
                value={form.batch}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              Branch/Department
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen size={18} className="text-gray-400" />
              </div>
              <input
                id="branch"
                name="branch"
                placeholder="Your branch"
                value={form.branch}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase size={18} className="text-gray-400" />
              </div>
              <input
                id="jobTitle"
                name="jobTitle"
                placeholder="Current position"
                value={form.jobTitle}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building size={18} className="text-gray-400" />
              </div>
              <input
                id="company"
                name="company"
                placeholder="Your company"
                value={form.company}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                id="location"
                name="location"
                placeholder="City, Country"
                value={form.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="linkedIn"
              className="block text-sm font-medium text-gray-700"
            >
              LinkedIn URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Linkedin size={18} className="text-gray-400" />
              </div>
              <input
                id="linkedIn"
                name="linkedIn"
                placeholder="https://linkedin.com/in/username"
                value={form.linkedIn}
                onChange={handleChange}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            About You
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FileText size={18} className="text-gray-400" />
            </div>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself, your achievements, interests, etc."
              value={form.bio}
              onChange={handleChange}
              rows="5"
              className="border border-gray-300 rounded-md pl-10 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={updating}
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
          >
            {updating ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="mr-2" size={18} />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
