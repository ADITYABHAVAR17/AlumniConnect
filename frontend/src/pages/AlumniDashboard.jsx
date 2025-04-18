import React from "react";
import { Link, Outlet } from "react-router-dom";

function AlumniDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Alumni Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link to="profile" className="text-blue-600">
              View Profile
            </Link>
          </li>
          <li>
            <Link to="edit-profile" className="text-blue-600">
              Edit Profile
            </Link>
          </li>
          <li>
            <Link to="directory" className="text-blue-600">
              Alumni Directory
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default AlumniDashboard;
