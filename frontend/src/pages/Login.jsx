import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("role", data.user.role || "");
        localStorage.setItem("testinova_role", data.user.role || "");
        localStorage.setItem("userEmail", email);

        setNotification({ message: "Login successful! Redirecting...", type: "success" });
        setTimeout(() => {
          if (!data.user.role) {
            navigate("/select-role");
          } else {
            navigate(`/dashboard/${data.user.role}`);
          }
        }, 2000);
      } else {
        setNotification({ message: data.message || "Login failed", type: "error" });
      }
    } catch (err) {
      setNotification({ message: "Server error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
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
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8 text-sm">
            Login to continue to Testinova
          </p>

      
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#1A3FFF] focus:ring-[#1A3FFF]"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#1A3FFF] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#1A3FFF] font-semibold underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}