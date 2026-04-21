// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { Code2, FileText, BarChart3, History, Zap, CheckCircle, TrendingUp, Clock } from "lucide-react";

// export default function QADashboard() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const role = "qa";

//   const [stats, setStats] = useState({
//     totalTests: 0,
//     mostUsedFramework: "-",
//     lastActivity: "-",
//     averageQualityScore: 0,
//   });

//   const [recentTests, setRecentTests] = useState([]);
//   const [expandedIds, setExpandedIds] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//       if (token) {
//         const decoded = jwtDecode(token);
//         setUsername(decoded.username);
//       }
//   }, []);

//   // =============================
//   // Fetch Dashboard Stats
//   // =============================
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         // use Promise.allSettled to allow partial success without failing entire call
//         const responses = await Promise.allSettled([
//           axios.get("http://localhost:5000/api/tests/total", { headers }),
//           axios.get("http://localhost:5000/api/tests/most-used-framework", { headers }),
//           axios.get("http://localhost:5000/api/tests/last-activity", { headers }),
//           axios.get("http://localhost:5000/api/tests/average-quality", { headers }),
//         ]);

//         const [totalRes, frameworkRes, lastRes, avgRes] = responses.map(r =>
//           r.status === "fulfilled" ? r.value : null
//         );

//         setStats(prev => ({
//           totalTests: totalRes?.data?.totalTests ?? prev.totalTests,
//           mostUsedFramework: frameworkRes?.data?.mostUsedFramework ?? prev.mostUsedFramework,
//           lastActivity: lastRes?.data?.lastActivity?.updatedAt
//             ? new Date(lastRes.data.lastActivity.updatedAt).toLocaleString()
//             : prev.lastActivity,
//           averageQualityScore: avgRes?.data?.averageQualityScore ?? prev.averageQualityScore,
//         }));
//       } catch (err) {
//         console.error("Error fetching stats", err);
//       }
//     };

//     fetchStats();
//   }, []);

//   // =============================
//   // Fetch Recent Tests
//   // =============================
//   useEffect(() => {
//     const fetchRecentTests = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await axios.get(
//           "http://localhost:5000/api/tests/recent-tests",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setRecentTests(res.data.recentTests || []);
//       } catch (error) {
//         console.error("Failed to fetch recent tests", error);
//       }
//     };

//     fetchRecentTests();
//   }, []);

//   const toggleExpand = (id) => {
//     setExpandedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const getScoreColor = (score) => {
//     if (score >= 76) return "text-green-600";
//     if (score >= 51) return "text-yellow-500";
//     return "text-red-500";
//   };

//   return (
//     <DashboardLayout role={role}>
//       <div className="min-h-screen bg-gray-50">

//         {/* ================== PROFESSIONAL HEADER ================== */}
//         <div className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-8 py-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   QA Engineer Dashboard
//                 </h1>
//                 <p className="mt-1 text-gray-600">
//                   AI-powered test generation & coverage analytics
//                 </p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500">Welcome back!</p>
//                   <p className="text-lg font-semibold text-gray-900">{username || "User"}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-[#1A3FFF] rounded-full flex items-center justify-center">
//                   <CheckCircle className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-8 py-8">

//         {/* ================== QUICK STATS ================== */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <Code2 className="w-6 h-6 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Tests Generated</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <TrendingUp className={`w-6 h-6 ${getScoreColor(stats.averageQualityScore)}`} />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Coverage Score</p>
//                 <p className={`text-2xl font-bold ${getScoreColor(stats.averageQualityScore)}`}>
//                   {stats.averageQualityScore}%
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <FileText className="w-6 h-6 text-purple-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Framework</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.mostUsedFramework}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="p-3 bg-orange-100 rounded-lg">
//                 <Clock className="w-6 h-6 text-orange-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Last Activity</p>
//                 <p className="text-sm font-bold text-gray-900 truncate">{stats.lastActivity}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================== MAIN ACTIONS ================== */}
//         <div className="grid md:grid-cols-2 gap-8 mb-8">

//           {/* Generate Tests */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900">Generate Tests</h2>
//                 <Zap className="w-6 h-6 text-[#1A3FFF]" />
//               </div>
//               <p className="text-gray-600 mt-1">Create AI-generated test scenarios instantly</p>
//             </div>

//             <div className="p-6">
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <button
//                   onClick={() => navigate("/qa/generate-test", { state: { testType: "ui" } })}
//                   className="p-4 border-2 border-blue-200 hover:bg-blue-50 rounded-lg text-left transition duration-200"
//                 >
//                   <div className="text-sm font-semibold text-gray-900">UI Tests</div>
//                   <div className="text-xs text-gray-500">Interface testing</div>
//                 </button>
//                 <button
//                   onClick={() => navigate("/qa/generate-test", { state: { testType: "workflow" } })}
//                   className="p-4 border-2 border-purple-200 hover:bg-purple-50 rounded-lg text-left transition duration-200"
//                 >
//                   <div className="text-sm font-semibold text-gray-900">Workflow</div>
//                   <div className="text-xs text-gray-500">User flows</div>
//                 </button>
//               </div>

//               <button
//                 onClick={() => navigate("/qa/generate-test")}
//                 className="w-full bg-[#1A3FFF] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 font-medium"
//               >
//                 <Zap className="w-5 h-5" />
//                 Start Generating
//               </button>
//             </div>
//           </div>

//           {/* View History & Reports */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900">Analysis & History</h2>
//                 <BarChart3 className="w-6 h-6 text-[#1A3FFF]" />
//               </div>
//               <p className="text-gray-600 mt-1">Review test execution and coverage insights</p>
//             </div>

//             <div className="p-6">
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="text-center p-4 bg-green-50 rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">+</div>
//                   <div className="text-sm text-green-600">Test History</div>
//                 </div>
//                 <div className="text-center p-4 bg-blue-50 rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">📊</div>
//                   <div className="text-sm text-blue-600">Coverage</div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <button
//                   onClick={() => navigate("/qa/test-history")}
//                   className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 font-medium text-sm flex items-center justify-center gap-2"
//                 >
//                   <History className="w-4 h-4" />
//                   View Test History
//                 </button>
//                 <button
//                   onClick={() => navigate("/qa/quality-reports")}
//                   className="w-full bg-[#1A3FFF] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm"
//                 >
//                   Coverage Reports
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================== RECENT TESTS ================== */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//               <History className="w-6 h-6 text-[#1A3FFF]" />
//               Recent Generated Tests
//             </h2>
//           </div>

//           <div className="divide-y divide-gray-200">
//             {recentTests.map((test, index) => {
//               const id = test.id || index;
//               const isExpanded = expandedIds.includes(id);

//               return (
//                 <div key={id} className="p-6 hover:bg-gray-50 transition duration-150">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <p className={`font-medium text-gray-900 ${!isExpanded ? 'line-clamp-2' : ''}`}>
//                         {test.requirementText}
//                       </p>
//                       <div className="flex items-center gap-4 mt-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           {test.framework}
//                         </span>
//                         <span className={`text-sm font-semibold ${getScoreColor(test.qualityScore)}`}>
//                           Score: {test.qualityScore}%
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {recentTests.length === 0 && (
//             <div className="p-12 text-center text-gray-500">
//               <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
//               <p>No tests generated yet. Start by clicking "Start Generating"</p>
//             </div>
//           )}
//         </div>

//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// // ================= HELPER REMOVED - Not needed anymore =================


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { Code2, FileText, BarChart3, History, Zap, CheckCircle, TrendingUp, Clock } from "lucide-react";

// export default function QADashboard() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");

//   const [stats, setStats] = useState({
//     totalTests: 0,
//     mostUsedFramework: "-",
//     lastActivity: "-",
//     averageQualityScore: 0,
//   });

//   const [recentTests, setRecentTests] = useState([]);
//   const [expandedIds, setExpandedIds] = useState([]);

//   // get username
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const data = jwtDecode(token);
//       setUsername(data.username);
//     }
//   }, []);

//   // fetch stats 
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         const total = await axios.get("http://localhost:5000/api/tests/total", { headers });
//         const framework = await axios.get("http://localhost:5000/api/tests/most-used-framework", { headers });
//         const last = await axios.get("http://localhost:5000/api/tests/last-activity", { headers });
//         const avg = await axios.get("http://localhost:5000/api/tests/average-quality", { headers });

//         setStats({
//           totalTests: total.data?.totalTests || 0,
//           mostUsedFramework: framework.data?.mostUsedFramework || "-",
//           lastActivity: last.data?.lastActivity?.updatedAt
//             ? new Date(last.data.lastActivity.updatedAt).toLocaleString()
//             : "-",
//           averageQualityScore: avg.data?.averageQualityScore || 0,
//         });

//       } catch (err) {
//         console.log("Error loading stats");
//       }
//     };

//     fetchStats();
//   }, []);

//   // fetch recent tests
//   useEffect(() => {
//     const fetchRecent = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "http://localhost:5000/api/tests/recent-tests",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setRecentTests(res.data?.recentTests || []);
//       } catch (err) {
//         console.log("Error loading recent tests");
//       }
//     };

//     fetchRecent();
//   }, []);

//   const toggleExpand = (id) => {
//     if (expandedIds.includes(id)) {
//       setExpandedIds(expandedIds.filter((x) => x !== id));
//     } else {
//       setExpandedIds([...expandedIds, id]);
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 76) return "text-green-600";
//     if (score >= 51) return "text-yellow-500";
//     return "text-red-500";
//   };

//   return (
//     <DashboardLayout role="qa">
//       <div className="min-h-screen bg-gray-50">

//         {/* HEADER */}
//         <div className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-8 py-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   QA Engineer Dashboard
//                 </h1>
//                 <p className="mt-1 text-gray-600">
//                   AI-powered test generation & coverage analytics
//                 </p>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500">Welcome back!</p>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {username || "User"}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-[#1A3FFF] rounded-full flex items-center justify-center">
//                   <CheckCircle className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-8 py-8">

//           {/* STATS */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center">
//                 <div className="p-3 bg-blue-100 rounded-lg">
//                   <Code2 className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Tests Generated</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.totalTests}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center">
//                 <div className="p-3 bg-green-100 rounded-lg">
//                   <TrendingUp className={`w-6 h-6 ${getScoreColor(stats.averageQualityScore)}`} />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Coverage Score</p>
//                   <p className={`text-2xl font-bold ${getScoreColor(stats.averageQualityScore)}`}>
//                     {stats.averageQualityScore}%
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center">
//                 <div className="p-3 bg-purple-100 rounded-lg">
//                   <FileText className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Framework</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.mostUsedFramework}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="flex items-center">
//                 <div className="p-3 bg-orange-100 rounded-lg">
//                   <Clock className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">Last Activity</p>
//                   <p className="text-sm font-bold text-gray-900 truncate">
//                     {stats.lastActivity}
//                   </p>
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* ACTIONS */}
//           <div className="grid md:grid-cols-2 gap-8 mb-8">

//             {/* Generate Tests */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-900">Generate Tests</h2>
//                   <Zap className="w-6 h-6 text-[#1A3FFF]" />
//                 </div>
//                 <p className="text-gray-600 mt-1">
//                   Create AI-generated test scenarios instantly
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="grid grid-cols-2 gap-4 mb-6">

//                   <button
//                     onClick={() => navigate("/qa/generate-test", { state: { testType: "ui" } })}
//                     className="p-4 border-2 border-blue-200 hover:bg-blue-50 rounded-lg text-left transition duration-200"
//                   >
//                     <div className="text-sm font-semibold text-gray-900">UI Tests</div>
//                     <div className="text-xs text-gray-500">Interface testing</div>
//                   </button>

//                   <button
//                     onClick={() => navigate("/qa/generate-test", { state: { testType: "workflow" } })}
//                     className="p-4 border-2 border-purple-200 hover:bg-purple-50 rounded-lg text-left transition duration-200"
//                   >
//                     <div className="text-sm font-semibold text-gray-900">Workflow</div>
//                     <div className="text-xs text-gray-500">User flows</div>
//                   </button>

//                 </div>

//                 <button
//                   onClick={() => navigate("/qa/generate-test")}
//                   className="w-full bg-[#1A3FFF] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 font-medium"
//                 >
//                   <Zap className="w-5 h-5" />
//                   Start Generating
//                 </button>
//               </div>
//             </div>

//             {/* History */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-900">Analysis & History</h2>
//                   <BarChart3 className="w-6 h-6 text-[#1A3FFF]" />
//                 </div>
//                 <p className="text-gray-600 mt-1">
//                   Review test execution and coverage insights
//                 </p>
//               </div>

//               <div className="p-6 space-y-3">
//                 <button
//                   onClick={() => navigate("/qa/test-history")}
//                   className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200"
//                 >
//                   View Test History
//                 </button>

//                 <button
//                   onClick={() => navigate("/qa/coverage-report")}
//                   className="w-full bg-[#1A3FFF] text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//                 >
//                   Coverage Reports
//                 </button>
//               </div>
//             </div>

//           </div>

//           {/* RECENT TESTS */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                 <History className="w-6 h-6 text-[#1A3FFF]" />
//                 Recent Generated Tests
//               </h2>
//             </div>

//             <div className="divide-y divide-gray-200">
//               {recentTests.map((test, index) => (
//                 <div key={index} className="p-6 hover:bg-gray-50">
//                   <p>{test.requirementText}</p>

//                   <div className="flex gap-4 mt-2">
//                     <span className="text-sm">{test.framework}</span>
//                     <span className={getScoreColor(test.qualityScore)}>
//                       Score: {test.qualityScore}%
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {recentTests.length === 0 && (
//               <div className="p-12 text-center text-gray-500">
//                 <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                 <p>No tests generated yet. Start by clicking "Start Generating"</p>
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Code2,
  FileText,
  BarChart3,
  History,
  Zap,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function QADashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [stats, setStats] = useState({
    totalTests: 0,
    mostUsedFramework: "-",
    lastActivity: "-",
    averageQualityScore: 0,
  });

  const [recentTests, setRecentTests] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = jwtDecode(token);
      setUsername(data.username);
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const total = await axios.get(
          "http://localhost:5000/api/tests/total",
          { headers }
        );

        const framework = await axios.get(
          "http://localhost:5000/api/tests/most-used-framework",
          { headers }
        );

        const last = await axios.get(
          "http://localhost:5000/api/tests/last-activity",
          { headers }
        );

        const avg = await axios.get(
          "http://localhost:5000/api/tests/average-quality",
          { headers }
        );

        setStats({
          totalTests: total.data?.totalTests || 0,
          mostUsedFramework: framework.data?.mostUsedFramework || "-",
          lastActivity: last.data?.lastActivity?.updatedAt
            ? new Date(
                last.data.lastActivity.updatedAt
              ).toLocaleString()
            : "-",
           averageQualityScore: avg.data?.averageQualityScore || 0,
        });
      } catch (error) {
        console.log("Error loading stats");
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    const loadRecentTests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/tests/recent-tests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecentTests(res.data?.recentTests || []);
      } catch (error) {
        console.log("Error loading recent tests");
      }
    };

    loadRecentTests();
  }, []);

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((x) => x !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 76) return "text-green-600";
    if (score >= 51) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <DashboardLayout role="qa">
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  QA Engineer Dashboard
                </h1>
                <p className="mt-1 text-gray-600">
                  AI-powered test generation & coverage analytics
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Welcome back!
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {username || "User"}
                  </p>
                </div>

                <div className="w-12 h-12 bg-[#1A3FFF] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Code2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    Tests Generated
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalTests}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp
                    className={`w-6 h-6 ${getScoreColor(
                      stats.averageQualityScore
                    )}`}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    Average Quality Score
                  </p>
                  <p
                    className={`text-2xl font-bold ${getScoreColor(
                      stats.averageQualityScore
                    )}`}
                  >
                    {stats.averageQualityScore}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    Framework
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.mostUsedFramework}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    Last Activity
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {stats.lastActivity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">
                  Generate Tests
                </h2>
                <p className="text-gray-600 mt-1">
                  Create AI-generated test scenarios instantly
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() =>
                      navigate("/qa/generate-test", {
                        state: { testType: "ui" },
                      })
                    }
                    className="p-4 border-2 border-blue-200 hover:bg-blue-50 rounded-lg text-left transition duration-200"
                  >
                    <div className="text-sm font-semibold">
                      UI Tests
                    </div>
                    <div className="text-xs text-gray-500">
                      Interface testing
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      navigate("/qa/generate-test", {
                        state: { testType: "workflow" },
                      })
                    }
                    className="p-4 border-2 border-purple-200 hover:bg-purple-50 rounded-lg text-left transition duration-200"
                  >
                    <div className="text-sm font-semibold">
                      Workflow
                    </div>
                    <div className="text-xs text-gray-500">
                      User flows
                    </div>
                  </button>
                </div>

                <button
                  onClick={() =>
                    navigate("/qa/generate-test")
                  }
                  className="w-full bg-[#1A3FFF] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
                >
                  <Zap className="w-5 h-5" />
                  Start Generating
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">
                  Analysis & History
                </h2>
                <p className="text-gray-600 mt-1">
                  Review test execution and coverage insights
                </p>
              </div>

              <div className="p-6 space-y-3">
                <button
                  onClick={() =>
                    navigate("/qa/test-history")
                  }
                  className="w-full bg-gray-100 py-2 rounded-lg"
                >
                  View Test History
                </button>

                <button
                  onClick={() =>
                    navigate("/reports/qa")
                  }
                  className="w-full bg-[#1A3FFF] text-white py-2 rounded-lg"
                >
                  Coverage Reports
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <History className="w-6 h-6 text-[#1A3FFF]" />
                Recent Generated Tests
              </h2>
            </div>

            <div className="divide-y">
              {recentTests.map((test, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <p>{test.requirementText}</p>

                  <div className="flex gap-4 mt-2">
                    <span className="text-sm">
                      {test.framework}
                    </span>

                    <span
                      className={getScoreColor(
                        test.qualityScore
                      )}
                    >
                      Score: {test.qualityScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {recentTests.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  No tests generated yet. Start by clicking
                  "Start Generating"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}