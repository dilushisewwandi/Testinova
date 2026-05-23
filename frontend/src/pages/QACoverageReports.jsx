import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { AlertCircle, CheckCircle2, Info, ChevronDown, ChevronUp } from "lucide-react";

const QACoverageReports = () => {
  const [tests, setTests] = useState([]);
  const [expandedTests, setExpandedTests] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQAReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/quality/qa-coverage-reports",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTests(res.data.reports || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQAReports();
  }, []);

  const toggleExpand = (id) => {
    setExpandedTests((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  const getScoreColor = (score) => {
    if (score >= 75) return "text-green-600 bg-green-100";
    if (score >= 50) return "text-orange-500 bg-orange-100";
    return "text-red-500 bg-red-100";
  };

  const getProgressColor = (score) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-orange-400";
    return "bg-red-400";
  };

  const getSeverityIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertCircle className="text-red-500 w-4 h-4" />;
      case "warning":
        return <AlertCircle className="text-orange-400 w-4 h-4" />;
      case "info":
        return <Info className="text-gray-400 w-4 h-4" />;
      default:
        return <CheckCircle2 className="text-green-500 w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="qa">
        <div className="p-10 text-center text-gray-400 text-lg">
          Loading QA reports...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="qa">
      <div className="p-8 bg-gray-50 min-h-screen">

    
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Coverage Reports
          </h1>
          <p className="text-gray-500 mt-1">
            QA reports
          </p>
        </div>

        {tests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400 text-lg">No QA reports found</p>
          </div>
        )}

        
        <div className="space-y-6">
          {tests.map((test, index) => {

            let feedback = test.feedback;

            if (typeof feedback === "string") {
              try {
                feedback = JSON.parse(feedback);
              } catch {
                feedback = [];
              }
            }

            if (!Array.isArray(feedback)) feedback = [];

            return (
              <div
                key={test.id || index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300"
              >

                <div
                  className="p-6 cursor-pointer flex justify-between items-start"
                  onClick={() => toggleExpand(test.id)}
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {test.framework} - {test.testType}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {test.requirementText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

              
                    <div
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getScoreColor(
                        test.qualityScore
                      )}`}
                    >
                      {Math.round(test.qualityScore || 0)}%
                    </div>

                    {expandedTests[test.id] ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

         
                <div className="px-6 pb-5">
                  <div className="w-full h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        test.qualityScore
                      )}`}
                      style={{
                        width: `${test.qualityScore || 0}%`,
                      }}
                    />
                  </div>
                </div>

         
                {expandedTests[test.id] && (
                  <div className="bg-gray-50/60">

             
                    <div className="p-6">
                      <h3 className="font-semibold mb-4 text-gray-800">
                        Feedback
                      </h3>

                      {feedback.length === 0 ? (
                        <p className="text-gray-400">
                          No feedback available
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {feedback.map((item, idx) => (
                            <div
                              key={`${test.id}-${idx}`}
                              className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                            >
                              {getSeverityIcon(item.type)}
                              <div>
                                <p className="text-sm text-gray-700">
                                  {item.message || item}
                                </p>
                                {item.type && (
                                  <span className="text-xs text-gray-400">
                                    {item.type}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                
                    <div className="p-6">
                      <h3 className="font-semibold mb-3 text-gray-800">
                        Generated Test Code
                      </h3>

                      <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto max-h-96">
                        {test.generatedCode}
                      </pre>
                    </div>

               
                    <div className="p-6 text-sm text-gray-600 grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400">Framework</p>
                        <p className="font-semibold">{test.framework}</p>
                      </div>

                      <div>
                        <p className="text-gray-400">Test Type</p>
                        <p className="font-semibold">{test.testType}</p>
                      </div>

                      <div>
                        <p className="text-gray-400">Created</p>
                        <p className="font-semibold">
                          {new Date(test.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QACoverageReports;