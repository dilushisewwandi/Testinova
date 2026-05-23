import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import {BookOpen,Clock,Search,Filter,RefreshCcw,ChevronDown,ChevronUp,} from "lucide-react";

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
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="text-center text-gray-500 mt-20">
          Loading history...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="text-blue-700" />
          Learning History
        </h1>
        <p className="text-gray-500 mt-1">
          All your past learning sessions
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <div className="flex gap-3 items-center">
          <Search className="text-gray-400" />
          <input
            className="w-full outline-none"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-4">
        {filteredData.map((item) => {
          const isOpen = expandedItems[item.testID];

          return (
            <div
              key={item.testID}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleExpand(item.testID)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.requirement}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Session
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              </div>

             
              {isOpen && (
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {item.generatedCode}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}