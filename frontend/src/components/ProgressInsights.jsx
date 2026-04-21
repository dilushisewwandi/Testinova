import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, Calendar, Target, Award, BarChart3, RefreshCcw } from "lucide-react";

export default function ProgressInsights({ onClose }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/learning/progress-insights",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInsights(res.data.insights);
    } catch (err) {
      console.error("Insights error:", err);
      setError("Failed to load progress insights");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={fetchInsights}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <RefreshCcw size={16} />
                Retry
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="text-[#1A3FFF]" size={24} />
                Progress Insights
              </h2>
              <p className="text-gray-600 mt-1">Detailed analytics of your learning journey</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-blue-600" size={20} />
                <span className="text-sm font-medium text-blue-800">Current Streak</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{insights.currentStreak}</p>
              <p className="text-xs text-blue-700">days in a row</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Award className="text-green-600" size={20} />
                <span className="text-sm font-medium text-green-800">Longest Streak</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{insights.longestStreak}</p>
              <p className="text-xs text-green-700">best streak</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-purple-600" size={20} />
                <span className="text-sm font-medium text-purple-800">Weekly Average</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{insights.weeklyAverage}</p>
              <p className="text-xs text-purple-700">sessions/week</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-orange-600" size={20} />
                <span className="text-sm font-medium text-orange-800">Consistency</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{insights.consistencyScore}%</p>
              <p className="text-xs text-orange-700">score</p>
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Growth Metrics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Growth</span>
                  <span className={`font-semibold ${insights.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {insights.monthlyGrowth >= 0 ? '+' : ''}{insights.monthlyGrowth}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Most Active Day</span>
                  <span className="font-semibold text-gray-900">{insights.mostActiveDay}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sessions</span>
                  <span className="font-semibold text-gray-900">{insights.totalSessions}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
              <div className="space-y-3">
                {insights.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-800">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Consistency</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${insights.consistencyScore}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{insights.consistencyScore}%</p>
                <p className="text-sm text-gray-600">consistency</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {insights.consistencyScore >= 80 ? "Excellent consistency! Keep it up!" :
               insights.consistencyScore >= 60 ? "Good consistency. Room for improvement." :
               insights.consistencyScore >= 30 ? "Fair consistency. Try to be more regular." :
               "Low consistency. Regular practice will help you progress faster."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#1A3FFF] text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Close Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}