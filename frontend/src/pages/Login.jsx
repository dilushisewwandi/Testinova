import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { buttonStyles, inputStyles, gradients } from "../assets/dummyStyles";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("username", data.user.name);
        // localStorage.setItem("role", data.user.role || "");
        // localStorage.setItem("userEmail", email.trim());
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("role", data.user.role || "");
        localStorage.setItem("testinova_role", data.user.role || "");
        localStorage.setItem("userEmail", email.trim());

        const user = data.user;

        alert(data.message);

        if (!user.role){
          navigate("/select-role");
        }else{
          navigate (`/dashboard/${user.role}`);
        }
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // if already logged in, go straight to role selection
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/select-role");
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* background decorations similar to landing */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>

      <div className="flex justify-center items-center pt-32 pb-20 px-4 relative z-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Login
          </h2>

          {/* Email */}
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

          {/* Password */}
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`${buttonStyles.primary} ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-600 mt-6">
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
