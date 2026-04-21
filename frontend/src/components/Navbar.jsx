import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Roles", href: "#roles" },
  ];

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    // navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("testinova_role");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isLandingPage = location.pathname === "/";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:inline">Testinova</span>
          </Link>

          {/* Desktop Navigation */}
          {isLandingPage && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          {/* Right Container */}
          <div className="flex items-center gap-4">
            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/dashboard/" + (localStorage.getItem("testinova_role") || "student"))}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && isLandingPage && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium transition duration-200"
              >
                Login
              </button>
            )}
          </div>
        )}

        {/* Mobile Menu for Authenticated Users */}
        {mobileMenuOpen && token && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;