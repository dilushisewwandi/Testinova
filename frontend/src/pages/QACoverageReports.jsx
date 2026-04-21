import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

const QACoverageReports = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTests, setExpandedTests] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQAReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/quality/qa-coverage-reports",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Filter only QA tests (UI and Workflow)
        const qaTests = res.data.reports.filter((test) => {
          const role = test.role || (["ui", "workflow"].includes((test.testType || "").toLowerCase()) ? "qa" : "developer");
          return role === "qa";
        });
        setTests(qaTests);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching QA coverage reports:", err);
        setError("Failed to load QA coverage reports");
        setLoading(false);
      }
    };

    fetchQAReports();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 75) return "#10b981"; // green
    if (score >= 50) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const getScoreCategory = (score) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Good";
    return "Needs Improvement";
  };

  const toggleExpand = (testId) => {
    setExpandedTests((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }));
  };

  const getSeverityIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="qa">
        <div className="p-8 text-center">Loading QA coverage reports...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="qa">
        <div className="p-8 text-center text-red-600">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="qa">
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          QA Coverage Reports
        </h1>
        <p className="text-gray-600 mb-6">
          Individual test coverage analysis and quality metrics
        </p>

        {tests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No QA tests found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleExpand(test.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {test.framework || "Unknown"} - {test.testType || "Test"}
                        </h2>
                        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {test.role || "QA"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {test.requirementText}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-3xl font-bold"
                        style={{ color: getScoreColor(test.qualityScore) }}
                      >
                        {Math.round(test.qualityScore)}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {getScoreCategory(test.qualityScore)}
                      </p>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${test.qualityScore}%`,
                          backgroundColor: getScoreColor(test.qualityScore),
                        }}
                      />
                    </div>
                    {test.coverageEstimate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Coverage Estimate: {Math.round(test.coverageEstimate)}%
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTests[test.id] && (
                  <>
                    <div className="border-t">
                      {/* Score Breakdown */}
                      {test.breakdown && (
                        <div className="p-6 bg-gray-50">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Score Breakdown
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(test.breakdown).map(
                              ([key, value]) => (
                                <div key={key} className="bg-white p-3 rounded">
                                  <p className="text-xs text-gray-600 capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </p>
                                  <p className="text-lg font-bold text-gray-900">
                                    {value !== null ? typeof value === 'number' ? value.toFixed(1) : value : "N/A"}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Feedback Items */}
                      {test.feedback && test.feedback.length > 0 && (
                        <div className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Feedback
                          </h3>
                          <div className="space-y-2">
                            {test.feedback.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 bg-gray-50 rounded"
                              >
                                {getSeverityIcon(item.type)}
                                <div className="flex-1">
                                  <p className="text-sm text-gray-900">
                                    {item.message}
                                  </p>
                                  <p className="text-xs text-gray-500 capitalize">
                                    {item.type}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Test Code */}
                      {test.generatedCode && (
                        <div className="p-6 border-t">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Test Code
                          </h3>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
                            {test.generatedCode}
                          </pre>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="p-6 border-t bg-gray-50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Framework</p>
                            <p className="font-semibold text-gray-900">
                              {test.framework || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Test Type</p>
                            <p className="font-semibold text-gray-900">
                              {test.testType || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Created</p>
                            <p className="font-semibold text-gray-900">
                              {test.createdAt
                                ? new Date(test.createdAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Test ID</p>
                            <p className="font-semibold text-gray-900">
                              #{test.id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QACoverageReports;
