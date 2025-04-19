import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Briefcase,
  MapPin,
  Calendar,
  Book,
  Linkedin,
  Mail,
  MessageSquare,
  User,
  Award,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

export default function AlumniProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/alumni/${id}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile data");
        setLoading(false);
      });
  }, [id]);

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-indigo-600",
      "bg-pink-600",
      "bg-teal-600",
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-medium">{error}</p>
        <p className="mt-2">Please try again later or contact support.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        <p className="font-medium">Profile not found</p>
        <p className="mt-2">
          The alumni profile you're looking for doesn't exist or has been
          removed.
        </p>
        <Link
          to="/alumni/dashboard/directory"
          className="text-indigo-600 font-medium mt-4 inline-block"
        >
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Cover image */}
      <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-lg relative">
        <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-20"></div>
      </div>

      <div className="px-6 py-8 relative">
        {/* Profile avatar */}
        <div className="absolute -top-16 left-6 rounded-full border-4 border-white shadow-lg overflow-hidden">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 object-cover"
            />
          ) : (
            <div
              className={`w-32 h-32 ${getAvatarColor(
                profile.name
              )} flex items-center justify-center text-white text-4xl font-bold`}
            >
              {profile.name ? profile.name.charAt(0).toUpperCase() : "A"}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end mb-8">
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-3 transition-colors">
            <Mail size={18} className="mr-2" />
            Email
          </button>
          <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            <MessageSquare size={18} className="mr-2" />
            Message
          </button>
        </div>

        {/* Profile information */}
        <div className="pt-4">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>

          {(profile.jobTitle || profile.company) && (
            <div className="flex items-center mt-2 text-gray-700">
              <Briefcase size={18} className="mr-2 text-gray-500" />
              <span className="font-medium">
                {profile.jobTitle || "Professional"}
              </span>
              {profile.company && (
                <>
                  <span className="mx-1">at</span>
                  <span className="font-medium">{profile.company}</span>
                </>
              )}
            </div>
          )}

          {profile.location && (
            <div className="flex items-center mt-2 text-gray-700">
              <MapPin size={18} className="mr-2 text-gray-500" />
              <span>{profile.location}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-6 mt-4">
            {(profile.batch || profile.graduationYear) && (
              <div className="flex items-center text-gray-700">
                <Calendar size={18} className="mr-2 text-gray-500" />
                <span>Batch of {profile.batch || profile.graduationYear}</span>
              </div>
            )}

            {profile.branch && (
              <div className="flex items-center text-gray-700">
                <Book size={18} className="mr-2 text-gray-500" />
                <span>{profile.branch}</span>
              </div>
            )}

            {profile.degree && (
              <div className="flex items-center text-gray-700">
                <GraduationCap size={18} className="mr-2 text-gray-500" />
                <span>{profile.degree}</span>
              </div>
            )}
          </div>

          {profile.email && (
            <div className="flex items-center mt-2 text-gray-700">
              <Mail size={18} className="mr-2 text-gray-500" />
              <span>{profile.email}</span>
            </div>
          )}

          {/* About section */}
          {profile.bio && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                About
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed">
                {profile.bio}
              </div>
            </div>
          )}

          {/* Skills/Expertise section */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience section */}
          {profile.experience && profile.experience.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Experience
              </h2>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-indigo-200 pl-4 py-1"
                  >
                    <h3 className="font-medium text-lg">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                    {exp.description && (
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education section */}
          {profile.education && profile.education.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Education
              </h2>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-indigo-200 pl-4 py-1"
                  >
                    <h3 className="font-medium text-lg">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.years}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements section */}
          {profile.achievements && profile.achievements.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Achievements
              </h2>
              <div className="space-y-2">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <Award
                      size={18}
                      className="mr-2 text-indigo-500 mt-1 flex-shrink-0"
                    />
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Connect
            </h2>
            <div className="flex space-x-3">
              {profile.linkedIn && (
                <a
                  href={
                    profile.linkedIn.startsWith("http")
                      ? profile.linkedIn
                      : `https://${profile.linkedIn}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Linkedin size={18} className="mr-2" />
                  LinkedIn
                </a>
              )}

              {profile.portfolio && (
                <a
                  href={
                    profile.portfolio.startsWith("http")
                      ? profile.portfolio
                      : `https://${profile.portfolio}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
