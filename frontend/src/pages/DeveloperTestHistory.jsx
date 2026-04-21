import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { Search, Code2, Calendar, ChevronDown, ChevronUp } from "lucide-react";

export default function DeveloperTestHistory() {
  const [tests, setTests] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/tests/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTests(res.data.recentTests || []);
      } catch (error) {
        console.error("Failed to fetch test history", error);
      }
    };

    fetchHistory();
  }, []);

  const filteredTests = tests.filter((test) =>
    test.requirementText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="developer">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Test History
            </h1>
            <p className="text-gray-500 mt-2">
              View and manage all generated test cases
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by requirement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A3FFF] shadow-sm"
          />
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <Code2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No test history found.
            </p>
          </div>
        )}

        {/* Test Cards */}
        <div className="space-y-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {test.requirementText}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    {/* Framework Badge */}
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                      {test.framework}
                    </span>

                    {/* Test Type */}
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full font-medium">
                      {test.testType}
                    </span>

                    {/* Date */}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(test.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === test.id ? null : test.id)
                  }
                  className="text-gray-500 hover:text-[#1A3FFF]"
                >
                  {expandedId === test.id ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>
              </div>

              {/* Code Section */}
              {expandedId === test.id && (
                <div className="bg-gray-900 text-green-400 text-sm p-6 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {test.generatedCode}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}