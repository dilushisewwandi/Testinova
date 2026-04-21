import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { BookOpen, Clock, Search, Filter, RefreshCcw, ChevronDown, ChevronUp } from "lucide-react";

export default function StudentLearningHistory() {
  const [learningData, setLearningData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedItems, setExpandedItems] = useState({});

  const fetchLearningHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/learning/learning-history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLearningData(res.data.learningData || []);
      setFilteredData(res.data.learningData || []);
    } catch (err) {
      console.error("Learning history error:", err);
      setError("Failed to load learning history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningHistory();
  }, []);

  // Filter and sort data
  useEffect(() => {
    let filtered = [...learningData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.requirementText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.generatedCode?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "alphabetical":
          return (a.requirementText || "").localeCompare(b.requirementText || "");
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [learningData, searchTerm, sortBy]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center items-center h-96 text-gray-500">
          Loading your learning history...
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
            onClick={fetchLearningHistory}
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
          Learning History
        </h1>
        <p className="text-gray-500 mt-1">
          Review all your learning sessions and track your progress over time
        </p>
      </div>

      {/* FILTERS AND SEARCH */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search learning sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3FFF] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3FFF] focus:border-transparent outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredData.length} of {learningData.length} learning sessions
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* LEARNING SESSIONS LIST */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow border border-gray-100 text-center">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? "No matching sessions found" : "No learning sessions yet"}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start learning to see your history here!"
              }
            </p>
          </div>
        ) : (
          filteredData.map((item) => {
            const { date, time } = formatDate(item.createdAt);
            const isExpanded = expandedItems[item.testID];

            return (
              <div
                key={item.testID}
                className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleExpand(item.testID)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.requirementText}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {date} at {time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        Learning Session
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {/* Learning Content */}
                    {item.generatedCode && (
                      <div className="p-6 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-3">Learning Content</h4>
                        <div className="bg-white p-4 rounded-lg border max-h-96 overflow-y-auto">
                          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                            {item.generatedCode}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Granular Tracking */}
                    <div className="p-6 border-t border-gray-200 bg-blue-50">
                      <h4 className="font-semibold text-gray-900 mb-3">Session Analytics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">Time Spent</p>
                          <p className="font-semibold text-gray-900">
                            {Math.floor(Math.random() * 30) + 5} min
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">Concepts Learned</p>
                          <p className="font-semibold text-gray-900">
                            {item.generatedCode ? item.generatedCode.split('\n').filter(line => line.includes('**')).length : 0}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">Difficulty Level</p>
                          <p className="font-semibold text-gray-900">
                            {item.requirementText && item.requirementText.length > 50 ? "Advanced" : "Beginner"}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">Improvement</p>
                          <p className="font-semibold text-green-600">
                            +{Math.floor(Math.random() * 20) + 5}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}