import React from "react";
import Navbar from "../components/Navbar";
import {Code2,ClipboardList,GraduationCap,Zap,CheckCircle,TrendingUp,BookOpen,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SelectRole() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const roles = [
    {
      id: "developer",
      title: "Developer",
      subtitle: "Build Robust Tests",
      description:
        "Generate AI-powered unit and integration tests from requirements.",
      icon: <Code2 className="w-10 h-10" />,
      color: "blue",
      features: [
        "Instant unit/integration test generation",
        "Framework-agnostic approach",
        "Code quality scoring",
        "Multi-language support",
      ],
    },
    {
      id: "qa",
      title: "QA Engineer",
      subtitle: "Test Coverage Focus",
      description:
        "Create automated UI and workflow tests with AI assistance.",
      icon: <ClipboardList className="w-10 h-10" />,
      color: "purple",
      features: [
        "UI automation tests",
        "Workflow testing",
        "Coverage reports",
        "Test history tracking",
      ],
    },
    {
      id: "student",
      title: "Student",
      subtitle: "Learn Testing Basics",
      description:
        "Learn testing concepts step-by-step with guided practice.",
      icon: <GraduationCap className="w-10 h-10" />,
      color: "green",
      features: [
        "Test concept learning",
        "Simple explanations",
        "Progress tracking",
        "Learning history tracking"
      ],
    },
  ];

  const handleSelect = async (role) => {
    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:5000/api/users/set-role",
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem("role", role);
    localStorage.setItem("testinova_role", role);

    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-24 px-6 pb-20">

        <div className="text-center mb-14">
          <h1 className="text-4xl font-semibold text-gray-900">
            Choose Your Role
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Select a role to access your workspace and tools.
          </p>

          <div className="flex justify-center gap-6 mt-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-600" /> AI Powered
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-blue-600" /> Instant
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Insightful
            </span>
          </div>
        </div>

        
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="bg-white border border-gray-100 rounded-xl p-6 cursor-pointer
              hover:border-gray-200 hover:shadow-sm transition"
            >
              
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4
                ${
                  role.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : role.color === "purple"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {role.icon}
              </div>

              
              <h2 className="text-xl font-semibold text-gray-900">
                {role.title}
              </h2>
              <p className="text-sm text-gray-500">{role.subtitle}</p>

              <p className="text-sm text-gray-600 mt-3">
                {role.description}
              </p>

              
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {role.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

           
              <button
                className={`mt-5 w-full py-2.5 rounded-lg text-white text-sm font-medium
                ${
                  role.color === "blue"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : role.color === "purple"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        
        <div className="mt-16 bg-white border border-gray-100 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <BookOpen className="w-6 h-6 mx-auto text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">
                Simple Workspace
              </p>
              <p className="text-sm text-gray-500">
                Clean tools per role
              </p>
            </div>

            <div>
              <Zap className="w-6 h-6 mx-auto text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">
                Fast Generation
              </p>
              <p className="text-sm text-gray-500">
                AI-powered output
              </p>
            </div>

            <div>
              <TrendingUp className="w-6 h-6 mx-auto text-gray-600 mb-2" />
              <p className="font-medium text-gray-900">
                Quality Insights
              </p>
              <p className="text-sm text-gray-500">
                Improve continuously
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}