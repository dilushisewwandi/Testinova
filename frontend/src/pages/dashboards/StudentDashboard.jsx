import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../layouts/DashboardLayout";
import {BookOpen,Clock,TrendingUp,FileText,Target,} from "lucide-react";
import ProgressInsights from "../../components/ProgressInsights";

export default function StudentDashboard() {
  const [username, setUsername] = useState("");

  const [data, setData] = useState({
    totalSessions: 0,
    progressLevel: "Beginner",
    lastActivity: null,
    mostLearnedTopic: "N/A",
    recentLearning: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/learning/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res.data);
    } catch (err) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getProgressColor = (level) => {
    if (level === "Advanced") return "text-green-700 bg-green-100";
    if (level === "Intermediate") return "text-yellow-700 bg-yellow-100";
    return "text-blue-700 bg-blue-100";
  };

  const progressPercent = Math.min(
    Math.round((data.totalSessions / 20) * 100),
    100
  );


  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="text-center mt-20 text-gray-500">
          Loading your dashboard...
        </div>
      </DashboardLayout>
    );
  }


  if (error) {
    return (
      <DashboardLayout role="student">
        <div className="text-center mt-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchDashboard}
            className="px-6 py-2 bg-[#0b1b33] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">

      <div className="bg-white/70 backdrop-blur border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Learning Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Track your progress and improve skills
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome</p>
              <p className="font-semibold text-gray-900">
                {username || "Student"}
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#1A3FFF] flex items-center justify-center shadow-md">
              <BookOpen className="text-white w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">

       
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Overall Progress
            </h2>

            <span className={`px-3 py-1 rounded-full text-sm ${getProgressColor(data.progressLevel)}`}>
              {data.progressLevel}
            </span>
          </div>

          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-3 bg-blue-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            {data.totalSessions} learning sessions completed
          </p>

        </div>

       
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <BookOpen className="text-blue-600 mb-2" />
            <p className="text-gray-500 text-sm">Total Sessions</p>
            <h2 className="text-2xl font-semibold text-gray-900">
              {data.totalSessions}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <TrendingUp className="text-orange-500 mb-2" />
            <p className="text-gray-500 text-sm">Level</p>
            <h2 className="text-lg font-semibold text-gray-900">
              {data.progressLevel}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <Clock className="text-purple-500 mb-2" />
            <p className="text-gray-500 text-sm">Last Activity</p>
            <h2 className="text-sm font-medium text-gray-800">
              {data.lastActivity
                ? new Date(data.lastActivity.createdAt).toLocaleString()
                : "No activity"}
            </h2>
          </div>

        </div>

     
        <div className="mb-10">
          <button
            onClick={() => setShowInsights(true)}
            className="px-6 py-3 bg-[#0b1b33] text-white rounded-lg hover:bg-[#132a4d]"
          >
            View Detailed Insights
          </button>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">

          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="text-blue-600" />
            Recent Activities
          </h2>

          {data.recentLearning.length === 0 ? (
            <p className="text-gray-500">No learning activity yet</p>
          ) : (
            <div className="space-y-3">
              {data.recentLearning.map((item) => (
                <div
                  key={item.testID}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="text-sm text-gray-800">
                    {item.requirement}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

       
        <div className="bg-blue-50 rounded-2xl p-6">

          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Target className="text-blue-600" />
            Focus Area
          </h2>

          <p className="text-gray-700 mt-2">
            {data.mostLearnedTopic}
          </p>

        </div>

      </div>

   
      {showInsights && (
        <ProgressInsights
          onClose={() => setShowInsights(false)}
          data={data}
        />
      )}

    </DashboardLayout>
  );
}