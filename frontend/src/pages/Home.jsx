import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MessageSquare,
  Users,
  UserCircle,
  Calendar,
  Award,
  ChevronRight,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";

export default function Home() {
  // Set static stats values
  const stats = {
    alumni: 342,
    posts: 1151,
    events: 78,
  };

  // Array of testimonials
  const testimonials = [
    {
      quote:
        "The Alumni Portal has been instrumental in helping me reconnect with former classmates and find new career opportunities through the alumni network.",
      name: "Sarah Johnson",
      position: "Marketing Director, Class of 2010",
    },
    {
      quote:
        "I've attended three alumni events organized through this platform. The connections I've made have been invaluable for both professional networking and personal friendships.",
      name: "Michael Chen",
      position: "Software Engineer, Class of 2015",
    },
    {
      quote:
        "As a recent graduate, the mentorship I received from alumni through this platform helped me navigate the early stages of my career with confidence.",
      name: "Jessica Rodriguez",
      position: "Research Analyst, Class of 2022",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Features of the platform
  const features = [
    {
      title: "Alumni Directory",
      description:
        "Find and connect with classmates across graduating years with powerful search and filter tools.",
      icon: <Users className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Community Feed",
      description:
        "Stay updated with the latest news, achievements, and opportunities shared by fellow alumni.",
      icon: <MessageSquare className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Profile Management",
      description:
        "Showcase your professional journey, achievements and interests with a customizable profile.",
      icon: <UserCircle className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Events & Networking",
      description:
        "Discover and join exclusive events, reunions and networking opportunities.",
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
    },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Advanced Background and Web Effect */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-24 md:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/network-bg.png')] opacity-10 animate-pulse"></div>

          {/* Floating circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-float-delayed"></div>

          {/* Web Effect - SVG lines and nodes */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="web-effect">
              <defs>
                <radialGradient
                  id="nodeGradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                </radialGradient>
              </defs>

              {/* Web nodes */}
              <circle
                className="web-node animate-pulse-slow"
                cx="10%"
                cy="20%"
                r="3"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-delayed"
                cx="25%"
                cy="15%"
                r="2"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse"
                cx="40%"
                cy="10%"
                r="4"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-slow"
                cx="55%"
                cy="25%"
                r="3"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-delayed"
                cx="70%"
                cy="15%"
                r="2"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse"
                cx="85%"
                cy="30%"
                r="4"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-slow"
                cx="15%"
                cy="45%"
                r="3"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-delayed"
                cx="30%"
                cy="55%"
                r="2"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse"
                cx="45%"
                cy="50%"
                r="4"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-slow"
                cx="60%"
                cy="60%"
                r="3"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-delayed"
                cx="75%"
                cy="45%"
                r="2"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse"
                cx="90%"
                cy="65%"
                r="4"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-slow"
                cx="20%"
                cy="75%"
                r="3"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-delayed"
                cx="35%"
                cy="85%"
                r="2"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse"
                cx="50%"
                cy="70%"
                r="4"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-slow"
                cx="65%"
                cy="80%"
                r="3"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse-delayed"
                cx="80%"
                cy="75%"
                r="2"
                fill="url(#nodeGradient)"
              />
              <circle
                className="web-node animate-pulse"
                cx="95%"
                cy="85%"
                r="4"
                fill="url(#nodeGradient)"
              />

              {/* Web lines */}
              <line
                className="web-line"
                x1="10%"
                y1="20%"
                x2="25%"
                y2="15%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="25%"
                y1="15%"
                x2="40%"
                y2="10%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="40%"
                y1="10%"
                x2="55%"
                y2="25%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="55%"
                y1="25%"
                x2="70%"
                y2="15%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="70%"
                y1="15%"
                x2="85%"
                y2="30%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="15%"
                y1="45%"
                x2="30%"
                y2="55%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="30%"
                y1="55%"
                x2="45%"
                y2="50%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="45%"
                y1="50%"
                x2="60%"
                y2="60%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="60%"
                y1="60%"
                x2="75%"
                y2="45%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="75%"
                y1="45%"
                x2="90%"
                y2="65%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="10%"
                y1="20%"
                x2="15%"
                y2="45%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="25%"
                y1="15%"
                x2="30%"
                y2="55%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="40%"
                y1="10%"
                x2="45%"
                y2="50%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="55%"
                y1="25%"
                x2="60%"
                y2="60%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="70%"
                y1="15%"
                x2="75%"
                y2="45%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="85%"
                y1="30%"
                x2="90%"
                y2="65%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="15%"
                y1="45%"
                x2="20%"
                y2="75%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="30%"
                y1="55%"
                x2="35%"
                y2="85%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="45%"
                y1="50%"
                x2="50%"
                y2="70%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="60%"
                y1="60%"
                x2="65%"
                y2="80%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="75%"
                y1="45%"
                x2="80%"
                y2="75%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="90%"
                y1="65%"
                x2="95%"
                y2="85%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="20%"
                y1="75%"
                x2="35%"
                y2="85%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="35%"
                y1="85%"
                x2="50%"
                y2="70%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="50%"
                y1="70%"
                x2="65%"
                y2="80%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="65%"
                y1="80%"
                x2="80%"
                y2="75%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.5"
              />
              <line
                className="web-line"
                x1="80%"
                y1="75%"
                x2="95%"
                y2="85%"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.4) 0%, transparent 50%)`,
              transition: "background 0.3s ease",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fadeIn">
              <span className="relative inline-block">
                Connect
                <span className="absolute -top-6 -right-6">
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                </span>
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                {" "}
                &{" "}
              </span>
              <span className="relative inline-block animate-float-slow">
                Grow
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fadeIn max-w-2xl mx-auto leading-relaxed">
              Join thousands of graduates in our thriving community platform
              designed exclusively for alumni connections, career growth, and
              meaningful networking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="relative z-10">Join the Community</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </Link>
              <Link
                to="/directory"
                className="group inline-flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300 overflow-hidden relative"
              >
                <span className="relative z-10">Explore Directory</span>
                <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 w-full h-full bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section with Static Numbers */}
        <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl transform transition-all duration-500 hover:scale-105 border border-white/10 group relative">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fill="#FFFFFF"
                    d="M47.7,-67.2C58.5,-55.4,62.1,-37.7,65.2,-21.3C68.3,-4.9,70.9,10.2,67.1,24.1C63.3,37.9,53.1,50.4,40.2,60.3C27.3,70.3,11.7,77.7,-4.8,83.9C-21.2,90.1,-38.5,95.2,-51.3,88.1C-64.1,81,-72.5,61.8,-76.2,43.4C-79.9,25,-79,7.4,-76.3,-10.1C-73.7,-27.5,-69.3,-44.9,-58.6,-56.7C-47.9,-68.5,-31.1,-74.7,-14.5,-73.3C2.1,-71.9,36.9,-79,47.7,-67.2Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {stats.alumni.toLocaleString()}+
                </div>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="w-6 h-6 text-yellow-300 animate-spin-slow" />
                </span>
              </div>
              <p className="text-blue-100 text-lg">Registered Alumni</p>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl transform transition-all duration-500 hover:scale-105 border border-white/10 group relative">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fill="#FFFFFF"
                    d="M41.3,-62.5C53.9,-52.3,64.5,-41.4,69.7,-28.3C74.9,-15.2,74.7,0.2,71.2,15C67.7,29.9,60.9,44.3,49.9,55.4C38.9,66.5,23.7,74.5,7.2,78.5C-9.4,82.4,-27.2,82.5,-41.8,75.5C-56.3,68.6,-67.5,54.7,-75.2,39.5C-82.9,24.3,-87.1,7.8,-84.2,-7.3C-81.2,-22.4,-71.2,-36.2,-58.8,-46.9C-46.5,-57.6,-31.8,-65.4,-17.1,-69.3C-2.4,-73.2,12.4,-73.3,24.8,-70.1C37.2,-67,28.6,-72.7,41.3,-62.5Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {stats.posts.toLocaleString()}+
                </div>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="w-6 h-6 text-yellow-300 animate-spin-slow" />
                </span>
              </div>
              <p className="text-blue-100 text-lg">Community Posts</p>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl transform transition-all duration-500 hover:scale-105 border border-white/10 group relative">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fill="#FFFFFF"
                    d="M54.2,-76.1C71.1,-66.9,86.3,-54,93.3,-37.9C100.2,-21.7,98.9,-2.2,94.1,16.4C89.3,35,81,52.8,67.8,65.8C54.6,78.8,36.5,86.9,17.9,88.5C-0.8,90.1,-19.8,85.2,-35.8,76.1C-51.9,67.1,-64.9,54,-74.1,38.2C-83.3,22.4,-88.8,3.9,-85.9,-13.2C-83,-30.2,-71.7,-45.8,-57.5,-55.5C-43.2,-65.2,-26,-69.1,-8.8,-72.5C8.4,-75.9,37.3,-85.3,54.2,-76.1Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {stats.events.toLocaleString()}+
                </div>
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="w-6 h-6 text-yellow-300 animate-spin-slow" />
                </span>
              </div>
              <p className="text-blue-100 text-lg">Events Organized</p>
            </div>
          </div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full transform rotate-180"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
              PLATFORM FEATURES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a comprehensive suite of tools designed to
              help alumni maintain meaningful connections and advance their
              careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-blue-50 p-4 rounded-xl mb-6 inline-block relative z-10 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative corner element */}
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50 relative">
        {/* Circular gradient background */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Alumni Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from members who have found value in our community
            </p>
          </div>

          <div className="relative h-auto md:h-72 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full transform transition-all duration-1000 ease-in-out ${
                  index === activeTestimonial
                    ? "opacity-100 translate-x-0"
                    : index < activeTestimonial
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-3xl mx-auto border border-gray-100 relative overflow-hidden">
                  {/* Decorative quote marks */}
                  <div className="absolute -top-6 -left-6 text-8xl text-indigo-100 opacity-50 font-serif">
                    "
                  </div>
                  <div className="absolute -bottom-6 -right-6 text-8xl text-indigo-100 opacity-50 font-serif rotate-180">
                    "
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="text-blue-500 h-6 w-6 mr-2" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-xl mb-6 italic relative z-10">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-blue-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-blue-700">
          <div className="absolute inset-0">
            {/* Animated blobs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-indigo-500/30 blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl animate-blob animation-delay-4000"></div>

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 2c7.18 0 13 5.82 13 13s-5.82 13-13 13S2 22.18 2 15 7.82 2 15 2z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to reconnect with your alumni network?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of graduates who are already benefiting from our
            thriving community. Get started today!
          </p>

          <Link
            to="/register"
            className="group inline-flex items-center justify-center px-10 py-5 border border-transparent text-xl font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="relative z-10">Join Now</span>
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white to-blue-100 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
          </Link>

          {/* Animated sparkle elements */}
          <div className="absolute -top-4 -right-4 opacity-75 animate-pulse">
            <Sparkles className="w-8 h-8 text-blue-300" />
          </div>
          <div className="absolute -bottom-4 -left-4 opacity-75 animate-pulse animation-delay-1000">
            <Sparkles className="w-8 h-8 text-blue-300" />
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Add this style to the document */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-delayed {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
