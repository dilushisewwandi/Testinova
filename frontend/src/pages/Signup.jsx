import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setNotification({ message: "Signup successful! Redirecting to login...", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setNotification({ message: data.message || "Signup failed", type: "error" });
      }
    } catch (err) {
      setNotification({ message: "Server error. Please try again.", type: "error" });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-gray-200">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-8 text-sm">
            Sign up to get started with Testinova
          </p>

          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.username
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#1A3FFF] focus:ring-[#1A3FFF]"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#1A3FFF] focus:ring-[#1A3FFF]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#1A3FFF] focus:ring-[#1A3FFF]"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Use 8+ characters with uppercase, lowercase, and numbers.
            </p>
          </div>

        
          <button
            onClick={handleSignup}
            className="w-full bg-[#1A3FFF] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#1A3FFF] font-semibold underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}