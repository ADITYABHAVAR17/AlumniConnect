import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Home,
  Users,
  MessageCircle,
  LogIn,
  ChevronDown,
  Compass,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const links = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    {
      path: "/directory",
      label: "Alumni Directory",
      icon: <Users size={18} />,
    },
    {
      path: "/forums",
      label: "Community Feed",
      icon: <MessageCircle size={18} />,
      hasDropdown: true,
      dropdownItems: [
        { path: "/forums", label: "All Posts" },
        { path: "/forums", label: "Events" },
        { path: "/forums", label: "Job Board" },
      ],
    },
    { path: "/login", label: "Login", icon: <LogIn size={18} /> },
    { path: "/register", label: "Register", icon: <LogIn size={18} /> },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add/remove class to body when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("mobile-navbar-open");
    } else {
      document.body.classList.remove("mobile-navbar-open");
    }
    return () => {
      document.body.classList.remove("mobile-navbar-open");
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-white flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Compass size={24} />
              <span>Alumni Portal</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-1 items-center justify-center">
            {links.map((link) =>
              link.hasDropdown ? (
                <div className="relative" key={link.path} ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                      location.pathname.startsWith(link.path)
                        ? "bg-white/20 text-white font-semibold"
                        : "text-white/90 hover:bg-white/10"
                    } transition-all duration-300`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 animate-fadeIn">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === item.path
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          } transition duration-300`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                    location.pathname === link.path
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/90 hover:bg-white/10"
                  } transition-all duration-300 hover:-translate-y-1`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              )
            )}
          </div>

          <button
            className="md:hidden bg-white/10 p-2 rounded-md text-white hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg absolute w-full transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } transition-all duration-300 ease-in-out overflow-hidden`}
        style={{ maxHeight: isMenuOpen ? "400px" : "0px" }}
      >
        {links.map((link) =>
          link.hasDropdown ? (
            <div key={link.path}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className={`flex items-center w-full justify-between px-4 py-3 ${
                  location.pathname.startsWith(link.path)
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="bg-gray-50 pl-8">
                  {link.dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                      className={`block px-4 py-2 ${
                        location.pathname === item.path
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600 hover:text-blue-600"
                      } transition duration-300`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 ${
                location.pathname === link.path
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              } transition-all duration-300`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
