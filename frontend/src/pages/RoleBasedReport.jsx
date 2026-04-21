import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoleBasedReport({ role }) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/tests/reports?role=${role}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReport(res.data);
    };

    fetchReport();
  }, []);

  if (!report) {
    return <div className="p-6">Loading reports...</div>;
  }

  const isDeveloper = role === "developer";

  const title = isDeveloper
    ? "Quality Reports"
    : "Coverage Reports";

  const mainScore = isDeveloper
    ? report.averageQuality
    : report.averageCoverage;

  const progressLabel = isDeveloper
    ? "Code Quality Strength"
    : "System Coverage Strength";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Main Score Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {progressLabel}
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${mainScore}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          {mainScore}% overall
        </p>
      </div>

      {/* Role Specific Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isDeveloper ? (
          <>
            <MetricCard
              title="Assertion Strength"
              value={report.assertionStrength}
            />
            <MetricCard
              title="Test Diversity"
              value={report.testDiversity}
            />
            <MetricCard
              title="Framework Usage"
              value={report.frameworkUsage}
            />
          </>
        ) : (
          <>
            <MetricCard
              title="Interaction Coverage"
              value={report.interactionCoverage}
            />
            <MetricCard
              title="Workflow Coverage"
              value={report.workflowCoverage}
            />
            <MetricCard
              title="Total Test Cases"
              value={report.totalTests}
              isCount
            />
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, isCount = false }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {isCount ? value : `${value}%`}
      </p>
    </div>
  );
}// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function RoleBasedReport({ role }) {
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         `http://localhost:5000/api/tests/reports?role=${role}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setReport(res.data);
//     };

//     fetchReport();
//   }, []);

//   if (!report) {
//     return <div className="p-6">Loading reports...</div>;
//   }

//   const isDeveloper = role === "developer";

//   const title = isDeveloper
//     ? "Quality Reports"
//     : "Coverage Reports";

//   const mainScore = isDeveloper
//     ? report.averageQuality
//     : report.averageCoverage;

//   const progressLabel = isDeveloper
//     ? "Code Quality Strength"
//     : "System Coverage Strength";

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold">{title}</h1>

//       {/* Main Score Card */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {progressLabel}
//         </h2>

//         <div className="w-full bg-gray-200 rounded-full h-4">
//           <div
//             className="bg-blue-600 h-4 rounded-full transition-all duration-500"
//             style={{ width: `${mainScore}%` }}
//           ></div>
//         </div>

//         <p className="mt-2 text-sm text-gray-600">
//           {mainScore}% overall
//         </p>
//       </div>

//       {/* Role Specific Metrics */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {isDeveloper ? (
//           <>
//             <MetricCard
//               title="Assertion Strength"
//               value={report.assertionStrength}
//             />
//             <MetricCard
//               title="Test Diversity"
//               value={report.testDiversity}
//             />
//             <MetricCard
//               title="Framework Usage"
//               value={report.frameworkUsage}
//             />
//           </>
//         ) : (
//           <>
//             <MetricCard
//               title="Interaction Coverage"
//               value={report.interactionCoverage}
//             />
//             <MetricCard
//               title="Workflow Coverage"
//               value={report.workflowCoverage}
//             />
//             <MetricCard
//               title="Total Test Cases"
//               value={report.totalTests}
//               isCount
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function MetricCard({ title, value, isCount }) {
//   const display = value == null ? "-" : isCount ? value : `${value}%`;
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5">
//       <h3 className="text-lg font-medium">{title}</h3>
//       <p className="mt-3 text-2xl font-bold text-blue-600">{display}</p>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function RoleBasedReport({ role }) {
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/tests/reports?role=${role}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setReport(res.data);
//       } catch (error) {
//         console.error("Error fetching report:", error);
//       }
//     };

//     fetchReport();
//   }, [role]);

//   if (!report) {
//     return <div className="p-6">Loading reports...</div>;
//   }

//   const isDeveloper = role === "developer";
//   const title = isDeveloper ? "Quality Reports" : "Coverage Reports";

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold">{title}</h1>

//       {/* Role Specific Metrics */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {isDeveloper ? (
//           <>
//             <MetricCard title="Assertion Strength" value={report.assertionStrength} />
//             <MetricCard title="Test Diversity" value={report.testDiversity} />
//             <MetricCard title="Framework Usage" value={report.frameworkUsage} />
//           </>
//         ) : (
//           <>
//             <MetricCard title="Interaction Coverage" value={report.interactionCoverage} />
//             <MetricCard title="Workflow Coverage" value={report.workflowCoverage} />
//             <MetricCard title="Total Test Cases" value={report.totalTests} isCount />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }