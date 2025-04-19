import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  User, 
  Mail, 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  BookOpen, 
  LinkedinIcon, 
  Clock, 
  ArrowLeft, 
  Edit, 
  CheckCircle,
  XCircle
} from "lucide-react";

const ViewAlumniProfile = () => {
  const { id } = useParams();
  const [alum, setAlum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/admin/alumni/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlum(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching alumni data:", err);
        setError("Failed to load alumni profile.");
        setLoading(false);
      }
    };
    fetchAlumni();
  }, [id]);

  // Function to handle verification status change
  const handleVerificationChange = async (status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/admin/alumni/${status ? 'verify' : 'unverify'}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlum(prev => ({ ...prev, isVerified: status }));
    } catch (err) {
      console.error("Error changing verification status:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 animate-pulse">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading alumni profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
        <XCircle size={36} className="mx-auto text-red-500 mb-2" />
        <h3 className="text-lg font-medium text-red-800">{error}</h3>
        <Link 
          to="/admin/dashboard/alumni-list" 
          className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Alumni List
        </Link>
      </div>
    );
  }

  // If no alumni data
  if (!alum) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
        <User size={36} className="mx-auto text-yellow-500 mb-2" />
        <h3 className="text-lg font-medium text-yellow-800">Alumni profile not found</h3>
        <Link 
          to="/admin/dashboard/alumni-list" 
          className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Alumni List
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <Link 
        to="/admin/dashboard/alumni-list" 
        className="inline-flex items-center mb-6 text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Alumni List
      </Link>
      
      {/* Profile header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-lg p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold shadow-md">
              {alum.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{alum.name}</h1>
              <div className="flex items-center text-indigo-100 mt-1">
                <Briefcase size={16} className="mr-1" />
                <span>{alum.jobTitle || 'No job title'}</span>
                {alum.company && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{alum.company}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            {alum.isVerified ? (
              <button 
                onClick={() => handleVerificationChange(false)}
                className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
              >
                <CheckCircle size={18} />
                <span>Verified</span>
              </button>
            ) : (
              <button 
                onClick={() => handleVerificationChange(true)}
                className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors"
              >
                <CheckCircle size={18} />
                <span>Verify Now</span>
              </button>
            )}
            
            <button className="flex items-center gap-1 bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition-colors">
              <Edit size={18} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button 
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "profile" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Details
          </button>
          
        </div>
      </div>
      
      {/* Profile content */}
      <div className="bg-white rounded-b-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                <User size={18} className="mr-2 text-indigo-600" />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{alum.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Graduation Batch</p>
                    <p className="font-medium">{alum.batch || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <BookOpen size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Branch / Specialization</p>
                    <p className="font-medium">{alum.branch || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Current Location</p>
                    <p className="font-medium">{alum.location || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                <Briefcase size={18} className="mr-2 text-indigo-600" />
                Professional Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Briefcase size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Job Title</p>
                    <p className="font-medium">{alum.jobTitle || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{alum.company || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <LinkedinIcon size={18} className="mr-3 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn Profile</p>
                    {alum.linkedIn ? (
                      <a 
                        href={alum.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        {alum.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')}
                      </a>
                    ) : (
                      <p className="font-medium">Not provided</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bio section - full width */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Bio / About</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {alum.bio ? (
                  <p className="text-gray-700 whitespace-pre-line">{alum.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">No bio information provided.</p>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ViewAlumniProfile;