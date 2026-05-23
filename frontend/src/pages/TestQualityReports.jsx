import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function TestQualityReports() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/quality/quality-report",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTests(res.data.reports || []);
      } catch (err) {
        console.error("Error fetching test reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading quality reports...</div>;
  }

  if (!tests.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p>No tests generated yet. Generate a test to see quality reports.</p>
      </div>
    );
  }

  const resolvedRole = (t) => {
    if (t.role) return t.role;
    const testTypeLower = (t.testType || "").toLowerCase();
    return ["ui", "workflow"].includes(testTypeLower)
      ? "qa"
      : "developer";
  };

  const developerTests = tests.filter(
    (t) => resolvedRole(t) === "developer" && t.qualityScore !== null
  );

  const qaTests = tests.filter(
    (t) => resolvedRole(t) === "qa" && t.qualityScore !== null
  );

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="text-[#1A3FFF]" />
          Quality Reports
        </h1>
      </div>

      {developerTests.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Developer Tests
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerTests.map((t) => (
              <TestCard key={t.id} test={t} />
            ))}
          </div>
        </section>
      )}

      {qaTests.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            QA Tests
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qaTests.map((t) => (
              <TestCard key={t.id} test={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------------- SCORE BAR ---------------- */
function ScoreBar({ value, max = 100, color = "bg-blue-500" }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
      <div
        className={`${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ---------------- TEST CARD ---------------- */
function TestCard({ test }) {
  const [showDetails, setShowDetails] = useState(false);

  const rawFeedback =
    typeof test.feedback === "string"
      ? (() => {
          try {
            return JSON.parse(test.feedback);
          } catch {
            return [];
          }
        })()
      : test.feedback;

  const normalizedFeedback = Array.isArray(rawFeedback)
    ? rawFeedback.map((f) =>
        typeof f === "string" ? { type: "warning", message: f } : f
      )
    : [];

  const score = test.qualityScore ?? 0;

  const scoreColor =
    score >= 75
      ? "text-green-600"
      : score >= 50
      ? "text-yellow-600"
      : "text-red-600";

  const barColor =
    score >= 75
      ? "bg-green-500"
      : score >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  let breakdown = test.breakdown || {};
  if (typeof breakdown === "string") {
    try {
      breakdown = JSON.parse(breakdown);
    } catch {
      breakdown = {};
    }
  }

  const assertionValue =
    breakdown.assertions ??
    breakdown.assertionStrength ??
    breakdown.assertionScore ??
    null;

  const diversityValue =
    breakdown.diversity ??
    breakdown.testDiversity ??
    breakdown.diversityScore ??
    null;

  const structureValue =
    breakdown.structure ??
    breakdown.frameworkStructure ??
    breakdown.structureScore ??
    null;

  const codeLengthValue =
    typeof breakdown.codeLength === "number"
      ? breakdown.codeLength
      : typeof breakdown.length === "number"
      ? breakdown.length
      : null;

  const formattingValue =
    breakdown.formatting ?? breakdown.formattingScore ?? null;

  // const getIcon = (type) => {
  //   if (type === "error") return <XCircle className="w-4 h-4 text-red-500" />;
  //   if (type === "warning")
  //     return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  //   return <CheckCircle className="w-4 h-4 text-green-500" />;
  // };

  const getIcon = (type) => {
  switch (type) {
    case "error":
      return <XCircle className="w-4 h-4 text-red-500" />;

    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;

    case "info":
      return <CheckCircle className="w-4 h-4 text-blue-500" />;

    case "success":
      return <CheckCircle className="w-4 h-4 text-green-500" />;

    default:
      return <CheckCircle className="w-4 h-4 text-gray-500" />;
  }
};

  // const getTextColor = (type) => {
  //   if (type === "error") return "text-red-600";
  //   if (type === "warning") return "text-yellow-700";
  //   return "text-green-700";
  // };

  const getTextColor = (type) => {
  switch (type) {
    case "error":
      return "text-red-600";

    case "warning":
      return "text-yellow-700";

    case "info":
      return "text-blue-600";

    case "success":
      return "text-green-600";

    default:
      return "text-gray-700";
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 capitalize">
            {test.testType || "Test"}
          </h3>
          <p className="text-xs text-gray-400">
            {test.framework || "-"} •{" "}
            {test.createdAt
              ? new Date(test.createdAt).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <span className={`text-2xl font-bold ${scoreColor}`}>
          {score}%
        </span>
      </div>

      <ScoreBar value={score} color={barColor} />

      {/* DETAILS BUTTON */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between text-sm text-[#1A3FFF] font-medium py-2 border-t border-gray-100 mt-2"
      >
        <span>{showDetails ? "Hide Details" : "Show Details"}</span>
        {showDetails ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* DETAILS */}
      {showDetails && (
        <div className="mt-3 space-y-4">

          {Object.keys(breakdown).length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Score Breakdown
              </p>

              <div className="space-y-2">
                <BreakdownRow label="Assertions" value={assertionValue} max={25} />
                <BreakdownRow label="Test Diversity" value={diversityValue} max={25} />
                <BreakdownRow label="Framework Structure" value={structureValue} max={20} />
                <BreakdownRow label="Code Length" value={codeLengthValue} max={15} />
                <BreakdownRow label="Formatting" value={formattingValue} max={15} />
              </div>
            </div>
          )}

          {normalizedFeedback.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Feedback
              </p>

              <ul className="space-y-1">
                {normalizedFeedback.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    {getIcon(f.type)}
                    <span className={getTextColor(f.type)}>
                      {f.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- BREAKDOWN ROW ---------------- */
function BreakdownRow({ label, value, max }) {
  const pct = value != null ? Math.min((value / max) * 100, 100) : 0;
  const display = value != null ? `${value}/${max}` : "-";

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span className="font-medium">{display}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-[#1A3FFF] h-1.5 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}