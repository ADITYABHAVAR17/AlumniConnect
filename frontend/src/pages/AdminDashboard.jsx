import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, Users, Menu, X, Bell, Settings, Search, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Animation for page transitions
  const [pageTransition, setPageTransition] = useState(false);
  
  // Handle screen size for responsive design
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect for page transitions
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Effect for handling responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    // Initial check
    handleResize();
    
    // Set up listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock notifications
  const notifications = [
    { id: 1, text: "New alumni registration", time: "5 min ago" },
    { id: 2, text: "System update completed", time: "1 hour ago" },
    { id: 3, text: "Weekly report available", time: "3 hours ago" }
  ];

  // Close popup menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationOpen && !event.target.closest('.notification-container')) {
        setNotificationOpen(false);
      }
      if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen, isProfileMenuOpen]);

  // Logout function
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    
    // Optional: Show a logout notification/toast
    console.log("Logged out successfully");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`bg-indigo-800 text-white fixed h-full z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          {isSidebarOpen && (
            <h2 className="font-bold text-xl">Admin Panel</h2>
          )}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-indigo-700 transition-colors ml-auto"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-8 flex flex-col justify-between h-[calc(100%-5rem)]">
          <div>
            <NavLink to="/admin/dashboard" icon={<Home size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
            <NavLink to="/admin/dashboard/alumni-list" icon={<Users size={20} />} label="Alumni List" isOpen={isSidebarOpen} />
            <NavLink to="/admin/dashboard/settings" icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
          </div>
          
          {/* Logout button in sidebar */}
          <div className="mt-auto mb-6">
            <button
              onClick={handleLogout}
              className={`flex items-center p-4 my-1 mx-2 rounded-lg transition-all duration-200 w-[90%] text-left text-red-200 hover:bg-red-700 hover:text-white`}
            >
              <div className="flex items-center justify-center">
                <LogOut size={20} />
              </div>
              {isSidebarOpen && (
                <span className="ml-4 transition-opacity duration-200">Logout</span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? (isMobile ? "ml-0" : "ml-64") : (isMobile ? "ml-0" : "ml-20")
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 mr-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-800 truncate">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search bar */}
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Notifications */}
            <div className="relative notification-container">
              <button 
                onClick={() => setNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <p className="text-sm text-gray-800">{notification.text}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <button className="text-indigo-600 text-sm hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User avatar with dropdown */}
            <div className="relative profile-menu-container">
              <button 
                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-md transition-all"
              >
                AD
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 animate-fadeIn">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold">Admin User</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <div className="p-2">
                    <Link to="/admin/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left mt-1"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main content area with page transition */}
        <main className="flex-1 overflow-auto">
          <div className={`p-6 ${pageTransition ? 'animate-fadeIn' : ''}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// Navigation link component with animation
const NavLink = ({ to, icon, label, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center p-4 my-1 mx-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-700 text-white shadow-md' 
          : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
      }`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      {isOpen && (
        <span className="ml-4 transition-opacity duration-200">{label}</span>
      )}
    </Link>
  );
};

export default AdminDashboard;