import React from "react";
import Navbar from "../components/Navbar";
import { Code2, ClipboardList, GraduationCap, Zap, CheckCircle, TrendingUp, BookOpen, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SelectRole() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const roles = [
    {
      id: "developer",
      title: "Developer",
      subtitle: "Build Robust Tests",
      description: "Generate AI-powered unit and integration tests from natural language requirements.",
      icon: <Code2 className="w-12 h-12" />,
      color: "blue",
      features: [
        "Instant unit test generation",
        "Framework-agnostic approach",
        "Code quality scoring",
        "Multi-language support",
      ],
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-300",
      iconBg: "bg-blue-600",
    },
    {
      id: "qa",
      title: "QA Engineer",
      subtitle: "Comprehensive Test Coverage",
      description: "Create automated UI and workflow tests with AI-assisted scenario generation.",
      icon: <ClipboardList className="w-12 h-12" />,
      color: "purple",
      features: [
        "UI test automation",
        "Workflow testing",
        "Coverage analytics",
        "Test execution reports",
      ],
      bgGradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-300",
      iconBg: "bg-purple-600",
    },
    {
      id: "student",
      title: "Student",
      subtitle: "Master Testing Fundamentals",
      description: "Learn testing concepts through interactive lessons and hands-on practice exercises.",
      icon: <GraduationCap className="w-12 h-12" />,
      color: "green",
      features: [
        "Structured learning paths",
        "Conceptual explanations",
        "Interactive exercises",
        "Progress tracking",
      ],
      bgGradient: "from-green-50 to-green-100",
      borderColor: "border-green-300",
      iconBg: "bg-green-600",
    },
  ];

  // const handleSelect = (role) => {
  //   localStorage.setItem("role", role);
  //   navigate(`/dashboard/${role}`);
  // };

  const handleSelect = async(role)=>{
    const token = localStorage.getItem("token");

    await axios.put("http://localhost:5000/api/users/set-role", {role}, {
      headers:{Authorization: `Bearer ${token}`},
    });

    // Save role to both keys so Navbar works correctly
    localStorage.setItem("role", role);
    localStorage.setItem("testinova_role", role);
    
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-20 px-6 pb-20">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select your role to access AI-powered testing tools tailored to your workflow. Each role provides specialized features to enhance your testing capabilities.
          </p>
          <div className="flex justify-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Zap className="w-5 h-5 text-[#1A3FFF]" />
              <span className="font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-[#1A3FFF]" />
              <span className="font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <TrendingUp className="w-5 h-5 text-[#1A3FFF]" />
              <span className="font-medium">Professional Tools</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer group border-2 border-gray-200 hover:border-gray-300"
            >
             
              <div className={`bg-gradient-to-r ${role.bgGradient} p-8 flex flex-col items-center relative`}>
                <div className={`${role.iconBg} text-white p-4 rounded-xl mb-4 group-hover:scale-110 transition duration-300`}>
                  {role.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{role.title}</h2>
                <p className="text-sm font-semibold text-gray-600 mt-1">{role.subtitle}</p>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {role.description}
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Key Features</p>
                  <ul className="space-y-3">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 shrink-0 mt-0.5 ${
                          role.color === "blue" ? "text-blue-600" :
                          role.color === "purple" ? "text-purple-600" :
                          "text-green-600"
                        }`}>
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition duration-300 
                    ${role.color === "blue" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    ${role.color === "purple" ? "bg-purple-600 hover:bg-purple-700" : ""}
                    ${role.color === "green" ? "bg-green-600 hover:bg-green-700" : ""}
                    transform group-hover:scale-95 active:scale-90`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Workspace</h3>
              <p className="text-gray-600">Each role has a dedicated dashboard with tools optimized for your specific testing needs.</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Test Generation</h3>
              <p className="text-gray-600">Generate comprehensive tests in seconds using our advanced AI engine powered by Llama models.</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Insights</h3>
              <p className="text-gray-600">Get detailed analytics and recommendations to improve your testing practices and code quality.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}