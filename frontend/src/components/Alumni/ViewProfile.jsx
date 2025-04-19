import React, { useEffect, useState } from "react";
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
  Edit,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

function ViewProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/alumni/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-600 mr-2" size={24} />
        <span className="text-lg text-gray-700">Loading profile data...</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600 py-8">
          Profile not found. Please complete your profile details.
        </p>
        <div className="flex justify-center">
          <Link
            to="/alumni/edit-profile"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit size={18} className="mr-2" />
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        <Link
          to="/alumni/dashboard/edit-profile"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Edit size={16} className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="space-y-6">
        {/* Header section with name and job info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <User className="mr-2 text-blue-600" size={24} />
                {profile.name || "Name not specified"}
              </h1>

              <div className="mt-2 flex items-center text-lg text-gray-700">
                <Briefcase className="mr-2 text-blue-600" size={18} />
                <span className="font-medium">
                  {profile.jobTitle || "Position not specified"}
                </span>
                {profile.company && (
                  <>
                    <span className="mx-1">at</span>
                    <span className="font-medium">{profile.company}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 text-blue-600" size={18} />
                {profile.location || "Location not specified"}
              </div>

              <div className="mt-2 flex items-center text-gray-600">
                <Calendar className="mr-2 text-blue-600" size={18} />
                <span>Batch: {profile.batch || "Not specified"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Department */}
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <BookOpen className="mr-2 text-blue-600" size={20} />
            Education Details
          </h2>

          <div className="ml-8">
            <div className="mb-2">
              <span className="font-medium text-gray-700">
                Department/Branch:
              </span>
              <span className="ml-2 text-gray-600">
                {profile.branch || "Not specified"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Batch Year:</span>
              <span className="ml-2 text-gray-600">
                {profile.batch || "Not specified"}
              </span>
            </div>
          </div>
        </div>

        {/* Work Details */}
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Building className="mr-2 text-blue-600" size={20} />
            Work Details
          </h2>

          <div className="ml-8">
            <div className="mb-2">
              <span className="font-medium text-gray-700">
                Current Position:
              </span>
              <span className="ml-2 text-gray-600">
                {profile.jobTitle || "Not specified"}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">
                Company/Organization:
              </span>
              <span className="ml-2 text-gray-600">
                {profile.company || "Not specified"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2 text-gray-600">
                {profile.location || "Not specified"}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FileText className="mr-2 text-blue-600" size={20} />
              About
            </h2>
            <div className="ml-8 text-gray-600 whitespace-pre-wrap">
              {profile.bio}
            </div>
          </div>
        )}

        {/* Social Links */}
        {profile.linkedIn && (
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Linkedin className="mr-2 text-blue-600" size={20} />
              Social Profiles
            </h2>
            <div className="ml-8">
              <a
                href={profile.linkedIn}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} className="mr-2" />
                LinkedIn Profile
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewProfile;
