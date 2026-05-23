import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {Code2,BarChart3,History,Zap,CheckCircle,TrendingUp,Clock,} from "lucide-react";

export default function DeveloperDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const role = "developer";

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
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [totalTests, mostUsedFramework, lastActivity, averageQuality] =
          await Promise.all([
            axios.get("http://localhost:5000/api/tests/total", { headers }),
            axios.get(
              "http://localhost:5000/api/tests/most-used-framework",
              { headers }
            ),
            axios.get("http://localhost:5000/api/tests/last-activity", {
              headers,
            }),
            axios.get("http://localhost:5000/api/tests/average-quality", {
              headers,
            }),
          ]);

        setStats({
          totalTests: totalTests.data.totalTests || 0,
          mostUsedFramework:
            mostUsedFramework.data.mostUsedFramework || "-",
          lastActivity: lastActivity.data.lastActivity?.updatedAt
            ? new Date(
                lastActivity.data.lastActivity.updatedAt
              ).toLocaleString()
            : "-",
          averageQualityScore:
            averageQuality.data?.averageQualityScore || 0,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchRecentTests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/tests/recent-tests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecentTests(res.data.recentTests || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecentTests();
  }, []);

  const Card = ({ children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      {children}
    </div>
  );

  return (
    <DashboardLayout role={role}>
      <div className="min-h-screen bg-gray-50">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Developer Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                AI-powered test generation & quality insights
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Welcome</p>
                <p className="font-semibold text-gray-900">
                  {username || "User"}
                </p>
              </div>

              <div className="w-11 h-11 rounded-full bg-[#1A3FFF] flex items-center justify-center shadow-md">
                <Code2 className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <Card>
              <div className="p-6 flex items-center gap-4">
                <Code2 className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Tests</p>
                  <h2 className="text-2xl font-semibold">
                    {stats.totalTests}
                  </h2>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6 flex items-center gap-4">
                <TrendingUp className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Quality Score</p>
                  <h2 className="text-2xl font-semibold">
                    {stats.averageQualityScore}%
                  </h2>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6 flex items-center gap-4">
                <CheckCircle className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Framework</p>
                  <h2 className="text-lg font-semibold">
                    {stats.mostUsedFramework}
                  </h2>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6 flex items-center gap-4">
                <Clock className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <h2 className="text-sm font-medium text-gray-800">
                    {stats.lastActivity}
                  </h2>
                </div>
              </div>
            </Card>
          </div>

          {/* ACTION CARDS */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">

            <Card>
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">
                  Generate Tests
                </h2>
                <p className="text-gray-500 text-sm">
                  Create AI-generated test cases instantly
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() =>
                      navigate("/developer/generate-test", {
                        state: { testType: "unit" },
                      })
                    }
                    className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition text-left"
                  >
                    <p className="font-medium">Unit Tests</p>
                    <p className="text-xs text-gray-500">
                      Components
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      navigate("/developer/generate-test", {
                        state: { testType: "integration" },
                      })
                    }
                    className="p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition text-left"
                  >
                    <p className="font-medium">Integration</p>
                    <p className="text-xs text-gray-500">
                      System flow
                    </p>
                  </button>
                </div>

                <button
                  onClick={() =>
                    navigate("/developer/generate-test")
                  }
                  className="w-full bg-[#1A3FFF] text-white py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <Zap size={18} />
                  Start Generating
                </button>
              </div>
            </Card>

            <Card>
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">
                  History & Reports
                </h2>
                <p className="text-gray-500 text-sm">
                  Track performance & past tests
                </p>
              </div>

              <div className="p-6 space-y-4">

                <button
                  onClick={() =>
                    navigate("/developer/test-history")
                  }
                  className="w-full bg-gray-50 hover:bg-gray-100 py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <History size={16} />
                  Test History
                </button>

                <button
                  onClick={() =>
                    navigate("/reports/developer")
                  }
                  className="w-full bg-[#1A3FFF] text-white py-3 rounded-xl hover:opacity-90 transition"
                >
                  Quality Reports
                </button>

              </div>
            </Card>
          </div>

          {/* RECENT TESTS */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">
                Recent Tests
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {recentTests.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  No tests generated yet
                </p>
              ) : (
                recentTests.map((test, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="font-medium text-gray-800">
                      {test.requirement}
                    </p>
                    <div className="flex gap-3 mt-2 text-sm">
                      <span className="text-gray-500">
                        {test.framework}
                      </span>
                      <span className="text-green-600 font-medium">
                        {test.qualityScore}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}