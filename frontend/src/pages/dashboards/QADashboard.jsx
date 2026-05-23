import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../layouts/DashboardLayout";
import {Code2,FileText,History,Zap,CheckCircle,TrendingUp,Clock,} from "lucide-react";

export default function QADashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [stats, setStats] = useState({
    totalTests: 0,
    mostUsedFramework: "-",
    lastActivity: "-",
    averageQualityScore: 0,
  });

  const [recentTests, setRecentTests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = jwtDecode(token);
      setUsername(data.username);
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const total = await axios.get(
          "http://localhost:5000/api/tests/total",
          { headers }
        );

        const framework = await axios.get(
          "http://localhost:5000/api/tests/most-used-framework",
          { headers }
        );

        const last = await axios.get(
          "http://localhost:5000/api/tests/last-activity",
          { headers }
        );

        const avg = await axios.get(
          "http://localhost:5000/api/tests/average-quality",
          { headers }
        );

        setStats({
          totalTests: total.data?.totalTests || 0,
          mostUsedFramework: framework.data?.mostUsedFramework || "-",
          lastActivity: last.data?.lastActivity?.updatedAt
            ? new Date(last.data.lastActivity.updatedAt).toLocaleString()
            : "-",
          averageQualityScore: avg.data?.averageQualityScore || 0,
        });
      } catch (error) {
        console.log("Error loading stats");
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    const loadRecentTests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/tests/recent-tests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRecentTests(res.data?.recentTests || []);
      } catch (error) {
        console.log("Error loading recent tests");
      }
    };

    loadRecentTests();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 76) return "text-green-600";
    if (score >= 51) return "text-yellow-500";
    return "text-red-500";
  };

  const cardStyle =
    "bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300";

  return (
    <DashboardLayout role="qa">
      <div className="min-h-screen bg-gray-50">

        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  QA Engineer Dashboard
                </h1>
             
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back</p>
                <p className="font-semibold text-gray-900">
                  {username || "User"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className={cardStyle + " p-6"}>
              <Code2 className="text-blue-600 mb-2" />
              <p className="text-sm text-gray-500">Tests Generated</p>
              <p className="text-2xl font-bold">{stats.totalTests}</p>
            </div>

            <div className={cardStyle + " p-6"}>
              <TrendingUp className="text-green-600 mb-2" />
              <p className="text-sm text-gray-500">Avg Quality</p>
              <p className="text-2xl font-bold">
                {stats.averageQualityScore}%
              </p>
            </div>

            <div className={cardStyle + " p-6"}>
              <FileText className="text-purple-600 mb-2" />
              <p className="text-sm text-gray-500">Framework</p>
              <p className="text-2xl font-bold">
                {stats.mostUsedFramework}
              </p>
            </div>

            <div className={cardStyle + " p-6"}>
              <Clock className="text-orange-500 mb-2" />
              <p className="text-sm text-gray-500">Last Activity</p>
              <p className="text-sm font-semibold truncate">
                {stats.lastActivity}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">

            <div className={cardStyle + " p-6"}>
              <h2 className="text-xl font-semibold mb-4">
                Generate Tests
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">

                <button
                  onClick={() =>
                    navigate("/qa/generate-test", {
                      state: { testType: "ui" },
                    })
                  }
                  className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 text-left"
                >
                  UI Tests
                  <p className="text-xs text-gray-500">
                    Interface testing
                  </p>
                </button>

                <button
                  onClick={() =>
                    navigate("/qa/generate-test", {
                      state: { testType: "workflow" },
                    })
                  }
                  className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 text-left"
                >
                  Workflow
                  <p className="text-xs text-gray-500">
                    User flows
                  </p>
                </button>
              </div>

              <button
                onClick={() => navigate("/qa/generate-test")}
                className="w-full bg-[#1A3FFF] text-white py-3 rounded-xl"
              >
                <Zap className="inline w-4 h-4 mr-2" />
                Start Generating
              </button>
            </div>

            <div className={cardStyle + " p-6"}>
              <h2 className="text-xl font-semibold mb-4">
                Analysis & History
              </h2>

              <button
                onClick={() => navigate("/qa/test-history")}
                className="w-full bg-gray-50 border border-gray-100 py-2 rounded-xl mb-3"
              >
                View Test History
              </button>

              <button
                onClick={() => navigate("/reports/qa")}
                className="w-full bg-[#1A3FFF] text-white py-2 rounded-xl"
              >
                Coverage Reports
              </button>
            </div>
          </div>

          {/* Recent Tests */}
          <div className={cardStyle + " p-6"}>

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-[#1A3FFF]" />
              Recent Tests
            </h2>

            <div className="space-y-4">
              {recentTests.map((test, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50"
                >
                  <p className="text-gray-900 font-medium">
                    {test.requirement}
                  </p>

                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-gray-500">
                      {test.framework}
                    </span>

                    <span className={getScoreColor(test.qualityScore)}>
                      {test.qualityScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {recentTests.length === 0 && (
              <div className="text-center text-gray-400 py-10">
                No tests yet
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}