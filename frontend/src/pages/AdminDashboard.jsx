import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav className="mb-4 flex gap-4">
        <Link to="/admin/dashboard">Home</Link>
        <Link to="/admin/dashboard/alumni-list">Alumni List</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
