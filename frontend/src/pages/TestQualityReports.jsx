// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function TestQualityReports() {
//   const [tests, setTests] = useState([]);

//   useEffect(() => {
//     const fetchTests = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/quality/quality-report",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setTests(res.data.reports);
//       } catch (err) {
//         console.error("Error fetching test reports:", err);
//       }
//     };

//     fetchTests();
//   }, []);

//   if (!tests.length) return <div className="p-6">No tests generated yet.</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold">Per-Test Quality Reports</h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tests.map((t) => (
//           <TestCard key={t.id} test={t} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function TestCard({ test }) {
//   const [showFeedback, setShowFeedback] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5">
//       <h2 className="text-xl font-semibold">{test.testType} Test</h2>
//       <p className="text-sm text-gray-500 mb-2">Framework: {test.framework}</p>

//       <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//         <div
//           className="bg-blue-600 h-4 rounded-full"
//           style={{ width: `${test.qualityScore}%` }}
//         ></div>
//       </div>
//       <p className="text-sm mb-2">Quality Score: {test.qualityScore}%</p>

//       {test.coverageEstimate != null && (
//         <p className="text-sm mb-2">Coverage Estimate: {test.coverageEstimate}%</p>
//       )}

//       <button
//         className="text-blue-600 text-sm font-medium underline mb-2"
//         onClick={() => setShowFeedback(!showFeedback)}
//       >
//         {showFeedback ? "Hide Feedback" : "Show Feedback"}
//       </button>

//       {/* {showFeedback && Array.isArray(test.feedback) && test.feedback.length > 0 &&  (
//         <ul className="list-disc list-inside text-sm text-gray-600">
//           {test.feedback.map((f, idx) => (
//             <li key={idx}>{f}</li>
//           ))} */}
//           {showFeedback && Array.isArray(test.feedback) && (
//   <ul className="text-sm">
//     {test.feedback.map((f, idx) => (
//       <li
//         key={idx}
//         className={
//           f.type === "error"
//             ? "text-red-600"
//             : f.type === "warning"
//             ? "text-yellow-600"
//             : "text-gray-600"
//         }
//       >
//         {f.message}
//       </li>
//     ))}
//     {showFeedback && (!test.feedback || test.feedback.length === 0) && (
//             <p className="text-sm text-gray-400">No issues found 🎉</p>
//           )}
//   </ul>
// )}
          
//       {test.breakdown && (
//   <div className="mt-3 text-sm text-gray-600">
//     <p>Assertions: {test.breakdown.assertions || 0}</p>
//     <p>Diversity: {test.breakdown.diversity || 0}</p>
//     <p>Structure: {test.breakdown.structure || 0}</p>
//     <p>Length: {test.breakdown.length || 0}</p>
//     <p>Formatting: {test.breakdown.formatting || 0}</p>
//   </div>
// )}

//       <p className="text-xs text-gray-400 mt-2">
//         Generated: {new Date(test.createdAt).toLocaleString()}
//       </p>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function TestQualityReports() {
//   const [tests, setTests] = useState([]);

//   useEffect(() => {
//     const fetchTests = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/quality/quality-report",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setTests(res.data.reports || []);
//       } catch (err) {
//         console.error("Error fetching test reports:", err);
//       }
//     };

//     fetchTests();
//   }, []);

//   if (!tests.length) {
//     return <div className="p-6">No tests generated yet.</div>;
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold">Per-Test Quality Reports</h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tests.map((t) => (
//           <TestCard key={t.id} test={t} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function TestCard({ test }) {
//   const [showFeedback, setShowFeedback] = useState(false);

//   const normalizedFeedback = Array.isArray(test.feedback)
//     ? test.feedback.map((f) =>
//         typeof f === "string"
//           ? { type: "warning", message: f }
//           : f
//       )
//     : [];

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5">
//       <h2 className="text-xl font-semibold">
//         {test.testType || "Test"}
//       </h2>

//       <p className="text-sm text-gray-500 mb-2">
//         Framework: {test.framework || "-"}
//       </p>

//       {/* Quality Bar */}
//       <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
//         <div
//           className="bg-blue-600 h-4 rounded-full"
//           style={{ width: `${test.qualityScore || 0}%` }}
//         ></div>
//       </div>

//       <p className="text-sm mb-2">
//         Quality Score: {test.qualityScore || 0}%
//       </p>

//       {/* Coverage */}
//       {test.coverageEstimate != null && (
//         <p className="text-sm mb-2">
//           Coverage Estimate: {test.coverageEstimate}%
//         </p>
//       )}

//       {/* Toggle */}
//       <button
//         className="text-blue-600 text-sm font-medium underline mb-2"
//         onClick={() => setShowFeedback(!showFeedback)}
//       >
//         {showFeedback ? "Hide Feedback" : "Show Feedback"}
//       </button>

//       {showFeedback && (
//         <>
//           {normalizedFeedback.length > 0 ? (
//             <ul className="text-sm space-y-1">
//               {normalizedFeedback.map((f, idx) => (
//                 <li
//                   key={idx}
//                   className={
//                     f.type === "error"
//                       ? "text-red-600"
//                       : f.type === "warning"
//                       ? "text-yellow-600"
//                       : "text-gray-600"
//                   }
//                 >
//                   • {f.message}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-gray-400">
//               No issues found 🎉
//             </p>
//           )}
//         </>
//       )}

//       {test.breakdown ? (
//         <div className="mt-3 text-sm text-gray-600">
//           <p>Assertions: {test.breakdown.assertions ?? "-"}</p>
//           <p>Diversity: {test.breakdown.diversity ?? "-"}</p>
//           <p>Structure: {test.breakdown.structure ?? "-"}</p>
//           <p>Length: {test.breakdown.length ?? "-"}</p>
//           <p>Formatting: {test.breakdown.formatting ?? "-"}</p>
//         </div>
//       ) : (
//         <p className="text-xs text-gray-400 mt-2">
//           No detailed breakdown available
//         </p>
//       )}

//       {/* Date */}
//       <p className="text-xs text-gray-400 mt-2">
//         Generated:{" "}
//         {test.createdAt
//           ? new Date(test.createdAt).toLocaleString()
//           : "-"}
//       </p>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

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
    return (
      <div className="p-6 text-gray-500">Loading quality reports...</div>
    );
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

  // only show developer tests that have quality scores
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
        <p className="text-gray-500 mt-1">
          Detailed breakdown of every generated test
        </p>
      </div>

      {/* Developer Tests */}
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

      {/* QA Tests */}
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

function TestCard({ test }) {
  const [showDetails, setShowDetails] = useState(false);

  const normalizedFeedback = Array.isArray(test.feedback)
    ? test.feedback.map((f) =>
        typeof f === "string" ? { type: "warning", message: f } : f
      )
    : [];

  const scoreColor =
    test.qualityScore >= 75
      ? "text-green-600"
      : test.qualityScore >= 50
      ? "text-yellow-600"
      : "text-red-600";

  const barColor =
    test.qualityScore >= 75
      ? "bg-green-500"
      : test.qualityScore >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-300">
      {/* Header */}
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
          {test.qualityScore ?? 0}%
        </span>
      </div>

      {/* Quality Score Bar */}
      <ScoreBar value={test.qualityScore ?? 0} color={barColor} />
      <p className="text-xs text-gray-500 mb-3">Quality Score</p>

      {/* Coverage (QA only) */}
      {test.coverageEstimate != null && test.coverageEstimate > 0 && (
        <>
          <ScoreBar value={test.coverageEstimate} color="bg-purple-500" />
          <p className="text-xs text-gray-500 mb-3">
            Coverage: {test.coverageEstimate}%
          </p>
        </>
      )}

      {/* Toggle Details Button */}
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

      {showDetails && (
        <div className="mt-3 space-y-4">

          {/* Breakdown Section - only for developer tests */}
          {test.breakdown ? (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Score Breakdown
              </p>
              <div className="space-y-2">
                <BreakdownRow
                  label="Assertions"
                  value={test.breakdown.assertions}
                  max={25}
                />
                <BreakdownRow
                  label="Test Diversity"
                  value={test.breakdown.diversity}
                  max={25}
                />
                <BreakdownRow
                  label="Framework Structure"
                  value={test.breakdown.structure}
                  max={20}
                />
                <BreakdownRow
                  label="Code Length"
                  value={test.breakdown.length}
                  max={15}
                />
                <BreakdownRow
                  label="Formatting"
                  value={test.breakdown.formatting}
                  max={15}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              No breakdown available for this test
            </p>
          )}

          {/* Feedback Section */}
          {normalizedFeedback.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Feedback
              </p>
              <ul className="space-y-1">
                {normalizedFeedback.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    {f.type === "error" ? (
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : f.type === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        f.type === "error"
                          ? "text-red-600"
                          : f.type === "warning"
                          ? "text-yellow-700"
                          : "text-green-700"
                      }
                    >
                      {f.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              No issues found — great test!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

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