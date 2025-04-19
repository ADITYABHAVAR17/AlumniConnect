import { Users, GraduationCap, Calendar, TrendingUp, Book, Activity, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  
  // Quick actions
  const quickActions = [
    { id: 1, title: "Send Newsletter", icon: <Mail size={20} />, color: "bg-indigo-600" },
    { id: 2, title: "Schedule Event", icon: <Calendar size={20} />, color: "bg-purple-600" },
    { id: 3, title: "Generate Reports", icon: <TrendingUp size={20} />, color: "bg-green-600" },
    { id: 4, title: "Update Resources", icon: <Book size={20} />, color: "bg-amber-600" }
  ];

  // Insight categories
  const insightCards = [
    { id: 1, title: "Total Alumni", description: "View complete alumni database", icon: <Users />, color: "bg-blue-500" },
    { id: 2, title: "New Registrations", description: "Recently joined alumni members", icon: <GraduationCap />, color: "bg-green-500" },
    { id: 3, title: "Upcoming Events", description: "Scheduled alumni gatherings", icon: <Calendar />, color: "bg-purple-500" },
    { id: 4, title: "Network Activity", description: "Recent platform engagement", icon: <Activity />, color: "bg-amber-500" }
  ];

  // Handler for navigating to alumni list
  const handleGoToAlumniList = () => {
    navigate("/admin/dashboard/alumni-list");
  };

  return (
    <div className="animate-fadeIn">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome to the Admin Dashboard</h2>
        <p className="text-indigo-100 mb-4">Manage your alumni network efficiently with our comprehensive tools and features.</p>
        <p className="text-indigo-100 mb-6">Use this dashboard to track alumni engagement, organize events, and maintain an active community.</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <button 
            onClick={handleGoToAlumniList}
            className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Users size={18} />
            Manage Alumni Profiles
          </button>
        </div>
      </div>

      {/* Information cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {insightCards.map(card => (
          <div key={card.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
            <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold">{card.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Resources */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Resources</h3>
          <p className="text-gray-600 mb-4">
            Access tools and resources to effectively manage the alumni network. Keep alumni profiles up-to-date and maintain 
            engagement through regular communications and events.
          </p>
          
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 mb-4">
            <h4 className="font-medium text-indigo-700 mb-1">Getting Started</h4>
            <p className="text-gray-600 text-sm">
              Learn how to use this dashboard effectively by exploring each section. Set up alumni categories, 
              configure email templates, and understand the reporting features.
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
            <h4 className="font-medium text-amber-700 mb-1">Best Practices</h4>
            <p className="text-gray-600 text-sm">
              Regular updates to alumni profiles ensure accurate data. Schedule events at least two months in advance 
              and send monthly newsletters to keep the community engaged.
            </p>
          </div>
          
          {/* Link to alumni list */}
          <Link 
            to="/admin/dashboard/alumni-list" 
            className="mt-6 inline-block text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
          >
            View alumni directory →
          </Link>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <p className="text-gray-600 mb-4">
            Common administrative tasks that can be performed with a single click.
          </p>
          
          <div className="space-y-3">
            {quickActions.map(action => (
              <button 
                key={action.id} 
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                  {action.icon}
                </div>
                <span className="font-medium text-gray-700">{action.title}</span>
              </button>
            ))}
          </div>
          
          <p className="text-gray-500 text-sm mt-4">
            These shortcuts help you perform routine tasks efficiently without navigating through multiple screens.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;