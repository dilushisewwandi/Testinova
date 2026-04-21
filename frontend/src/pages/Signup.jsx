import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { buttonStyles, inputStyles } from "../assets/dummyStyles";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/select-role");
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>

      <div className="flex justify-center items-center pt-32 pb-20 px-4 relative z-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Create Account
          </h2>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              className={inputStyles.base}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className={inputStyles.base}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className={inputStyles.base}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
              Must contain 8+ characters, uppercase, lowercase, number & symbol.
            </p>
          </div>

          <button
            onClick={handleSignup}
            className={buttonStyles.primary}
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-6">
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
