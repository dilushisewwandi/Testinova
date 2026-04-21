import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { BookOpen, Clock, TrendingUp, FileText, RefreshCcw, Target, Award, Zap, Calendar, BarChart3 } from "lucide-react";
import ProgressInsights from "../../components/ProgressInsights";

export default function StudentDashboard() {
  const [data, setData] = useState({
    totalSessions: 0,
    progressLevel: "Beginner",
    lastActivity: null,
    mostLearnedTopic: "N/A",
    recentLearning: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProgressInsights, setShowProgressInsights] = useState(false);

  // Enhanced progress metrics
  const getProgressMetrics = (data) => {
    const { totalSessions, progressLevel, recentLearning } = data;

    // Calculate sessions this week
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sessionsThisWeek = recentLearning.filter(item =>
      new Date(item.createdAt) > weekAgo
    ).length;

    // Calculate learning streak (consecutive days with activity)
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const hasActivity = recentLearning.some(item => {
        const itemDate = new Date(item.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === checkDate.getTime();
      });

      if (hasActivity) {
        streak++;
      } else if (i > 0) { // Don't break streak for future dates
        break;
      }
    }

    return {
      sessionsThisWeek,
      learningStreak: streak,
      weeklyGoal: Math.max(3, Math.ceil(totalSessions / 4)), // Dynamic goal
      progressPercentage: Math.min(100, (totalSessions / 20) * 100) // 20 sessions = 100%
    };
  };

  // Dynamic learning recommendations
  const getLearningRecommendations = (data) => {
    const { totalSessions, progressLevel, sessionsThisWeek } = data;
    const metrics = getProgressMetrics(data);

    const recommendations = [];

    if (totalSessions < 3) {
      recommendations.push({
        icon: <BookOpen className="w-5 h-5 text-blue-600" />,
        title: "Start with Fundamentals",
        description: "Learn basic testing concepts like unit testing and assertions",
        action: "Try: 'Explain unit testing basics'"
      });
    }

    if (sessionsThisWeek < 2) {
      recommendations.push({
        icon: <Zap className="w-5 h-5 text-orange-600" />,
        title: "Build Consistency",
        description: "Learn regularly to improve faster",
        action: `Complete ${metrics.weeklyGoal - sessionsThisWeek} more sessions this week`
      });
    }

    if (progressLevel === "Beginner" && totalSessions >= 5) {
      recommendations.push({
        icon: <Target className="w-5 h-5 text-green-600" />,
        title: "Level Up to Intermediate",
        description: "You're ready for more advanced topics",
        action: "Try: 'Explain integration testing'"
      });
    }

    if (progressLevel === "Intermediate") {
      recommendations.push({
        icon: <Award className="w-5 h-5 text-purple-600" />,
        title: "Master Advanced Topics",
        description: "Explore UI testing, API testing, and automation",
        action: "Try: 'How to test a web application'"
      });
    }

    return recommendations.slice(0, 3); // Show max 3 recommendations
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/learning/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getProgressColor = (level) => {
    if (level === "Advanced") return "text-green-600 bg-green-100";
    if (level === "Intermediate") return "text-yellow-600 bg-yellow-100";
    return "text-blue-600 bg-blue-100";
  };

  const metrics = getProgressMetrics(data);
  const recommendations = getLearningRecommendations(data);

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center items-center h-96 text-gray-500">
          Loading your learning dashboard...
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
            className="flex items-center gap-2 mx-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCcw size={16} />
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="text-[#1A3FFF]" size={32} />
          Learning Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Track your progress and master software testing skills
        </p>
      </div>

      {/* PROGRESS OVERVIEW */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getProgressColor(data.progressLevel)}`}>
            {data.progressLevel} Level
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${metrics.progressPercentage}%` }}
          />
        </div>

        <p className="text-sm text-gray-600">
          {data.totalSessions} learning sessions completed • {metrics.progressPercentage.toFixed(0)}% to next level
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100">
          <BookOpen className="text-blue-600 mb-2" size={24} />
          <p className="text-sm text-gray-500">Total Sessions</p>
          <h2 className="text-3xl font-bold">{data.totalSessions}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100">
          <Calendar className="text-green-600 mb-2" size={24} />
          <p className="text-sm text-gray-500">This Week</p>
          <h2 className="text-3xl font-bold">{metrics.sessionsThisWeek}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100">
          <TrendingUp className="text-orange-600 mb-2" size={24} />
          <p className="text-sm text-gray-500">Learning Streak</p>
          <h2 className="text-3xl font-bold">{metrics.learningStreak} days</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100">
          <Clock className="text-purple-600 mb-2" size={24} />
          <p className="text-sm text-gray-500">Last Activity</p>
          <p className="text-sm font-medium mt-2">
            {data.lastActivity
              ? new Date(data.lastActivity.createdAt).toLocaleDateString()
              : "No activity yet"}
          </p>
        </div>
      </div>

      {/* PROGRESS INSIGHTS BUTTON */}
      <div className="mb-8">
        <button
          onClick={() => setShowProgressInsights(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          <BarChart3 size={20} />
          View Detailed Progress Insights
        </button>
      </div>

      {/* LEARNING RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="text-[#1A3FFF]" size={20} />
            Recommended Next Steps
          </h2>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  {rec.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium">{rec.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECENT LEARNING ACTIVITY */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="text-[#1A3FFF]" size={20} />
          Recent Learning Activity
        </h2>

        {data.recentLearning.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>No learning activity yet</p>
            <p className="text-sm mt-2">Start learning to see your progress here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.recentLearning.map((item) => (
              <div
                key={item.testID}
                className="flex justify-between items-start p-4 rounded-xl border hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 line-clamp-2">
                    {item.requirementText}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full ml-4">
                  Learning Session
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOPIC INSIGHT */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FileText className="text-green-600" size={20} />
          Your Focus Area
        </h2>

        <p className="text-gray-700 mb-2">
          Most learned topic: <span className="font-semibold">{data.mostLearnedTopic}</span>
        </p>

        <p className="text-sm text-gray-600">
          Keep exploring different testing concepts to build well-rounded skills. Try new topics regularly!
        </p>
      </div>

      {/* PROGRESS INSIGHTS MODAL */}
      {showProgressInsights && (
        <ProgressInsights
          onClose={() => setShowProgressInsights(false)}
          data={data}
        />
      )}
    </DashboardLayout>
  );
}