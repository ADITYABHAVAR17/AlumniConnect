import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlumniDashboard from "./pages/AlumniDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ViewProfile from "./components/Alumni/ViewProfile";
import EditProfile from "./components/Alumni/EditProfile";
import AlumniDirectory from "./components/Alumni/AlumniDirectory";

import AdminHome from "./components/Admin/AdminHome";
import AlumniList from "./components/Admin/AlumniList";
import ViewAlumniProfile from "./components/Admin/ViewAlumniProfile";

import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";

import FeedList from "./components/Feed/FeedList";
import ChatWindowWrapper from "./components/Chat/ChatWindowWrapper";
import AlumniProfile from "./components/Alumni/AlumniProfile";

import AlumniDataDirectory from "./components/AlumniDataDirectory";
import AlumniHomepage from "./components/Alumni/AlumniHomepage";
import Forums from "./components/Forums";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
function App() {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const hideNavbar = ["/alumni/dashboard", "/admin/dashboard"];

  const shouldHideNavbar = hideNavbar.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/directory" element={<AlumniDataDirectory />} />
        <Route path="/directory/:id" element={<AlumniProfile />} />
        <Route path="/forums" element={<Forums />} />

        {/* 🔒 Protected Alumni Routes */}
        <Route
          path="/alumni/dashboard"
          element={
            <RequireAuth>
              <RequireRole role="alumni">
                <AlumniDashboard />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route index element={<AlumniHomepage />} />
          <Route path="profile" element={<ViewProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="directory" element={<AlumniDirectory />} />
          <Route path="community" element={<FeedList />} />
          <Route path="events" element={<FeedList />} />
          <Route path="directory/:id" element={<AlumniProfile />} />
          <Route path="chat/:receiverId" element={<ChatWindowWrapper />} />
        </Route>

        {/* 🔒 Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <RequireRole role="admin">
                <AdminDashboard />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="alumni-list" element={<AlumniList />} />
          <Route path="view-alumni/:id" element={<ViewAlumniProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
