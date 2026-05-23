import React from "react";
import {Home,FileText, History,Settings,LogOut,BookOpen,BarChart3,Code2,Target,} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const roleMenus = {
    developer: [
      { label: "Dashboard", icon: <Home size={18} />, path: `/dashboard/developer` },
      { label: "Generate Tests", icon: <Code2 size={18} />, path: `/developer/generate-test` },
      { label: "History", icon: <History size={18} />, path: `/developer/test-history` },
      { label: "Quality Reports", icon: <BarChart3 size={18} />, path: `/reports/developer` },
      // { label: "Settings", icon: <Settings size={18} />, path: `/settings/developer` },
    ],
    qa: [
      { label: "Dashboard", icon: <Home size={18} />, path: `/dashboard/qa` },
      { label: "UI / Workflow Tests", icon: <FileText size={18} />, path: `/qa/generate-test` },
      { label: "History", icon: <History size={18} />, path: `/qa/test-history` },
      { label: "Coverage Reports", icon: <BarChart3 size={18} />, path: `/reports/qa` },
    ],
    student: [
      { label: "Dashboard", icon: <Home size={18} />, path: `/dashboard/student` },
      { label: "Learning Concepts", icon: <FileText size={18} />, path: `/student/learn` },
      // { label: "Practice", icon: <Target size={18} />, path: `/student/practice` },
      { label: "Learning History", icon: <History size={18} />, path: `/student/learning-history` },
    ],
  };

  const menu = roleMenus[role] || [];

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("testinova_role");
    // navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("testinova_role");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0B1020] to-[#121833] text-white flex flex-col justify-between shadow-xl">

      {/* Branding */}
      <div>
        <div className="px-6 pt-10">
          <h1 className="text-2xl font-bold tracking-wide">Testinova</h1>
          <p className="text-xs text-gray-400 mt-1 capitalize">
            {role} Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-10 flex flex-col gap-2 px-3">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm
                  ${
                    isActive
                      ? "bg-[#1A3FFF] text-white shadow-md"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-3 pb-8">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}