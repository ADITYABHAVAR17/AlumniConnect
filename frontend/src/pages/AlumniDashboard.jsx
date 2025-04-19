import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";

function AlumniDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/alumni/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  const isActive = (path) => {
    return location.pathname.endsWith(path)
      ? "bg-indigo-700 text-white"
      : "text-gray-300 hover:bg-indigo-800 hover:text-white";
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-indigo-600 text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - fixed on mobile, static on desktop */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:sticky lg:translate-x-0 top-0 z-10 transition-transform duration-300 ease-in-out w-64 h-screen bg-indigo-900 text-white shadow-lg flex flex-col overflow-y-auto`}
      >
        {/* Logo & Header */}
        <div className="p-5 border-b border-indigo-800">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <BookOpen size={24} className="text-indigo-700" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Alumni Portal</h1>
              <p className="text-xs text-indigo-300">Class of 2024</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-5 pb-4 px-3 overflow-y-auto">
          <div className="mb-6">
            <p className="px-3 text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
              Main
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  to=""
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "dashboard"
                  )}`}
                >
                  <Home size={18} className="mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="profile"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "profile"
                  )}`}
                >
                  <User size={18} className="mr-3" />
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="directory"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "directory"
                  )}`}
                >
                  <Users size={18} className="mr-3" />
                  Alumni Directory
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <p className="px-3 text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
              Community
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  to="events"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "events"
                  )}`}
                >
                  <Calendar size={18} className="mr-3" />
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="community"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "forum"
                  )}`}
                >
                  <MessageSquare size={18} className="mr-3" />
                  Discussion Forum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
              Account
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  to="edit-profile"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "edit-profile"
                  )}`}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="logout"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-indigo-800 hover:text-white"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                {profile.name || "Loading..."}
              </p>
              <p className="text-xs text-indigo-300">
                {profile.email || "No email"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              Alumni Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors">
                Notifications
              </button>
              <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                Connect
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-sm text-gray-500 text-center">
              © 2025 Alumni Association. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AlumniDashboard;
