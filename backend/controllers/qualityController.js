import { TestGeneration } from "../models/syncModels.js";
import { calculateDeveloperScore } from "../utils/scoreCalculator.js";

// // helper
// function average(arr) {
//   if (!arr.length) return 0;
//   return arr.reduce((a, b) => a + b, 0) / arr.length;
// }

// // average quality score
// export const getAverageQualityScore = async (req, res) => {
//   try {
//     const userID = req.user.id;

//     const result = await TestGeneration.findAll({
//       where: { userID },
//       attributes: [
//         [
//           TestGeneration.sequelize.fn("AVG", TestGeneration.sequelize.col("qualityScore")),
//           "avgScore",
//         ],
//       ],
//     });

//     const avgScore = result?.[0]?.dataValues?.avgScore;

//     res.json({
//       averageQualityScore: Math.round(avgScore || 0),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error getting average quality score" });
//   }
// };

// // simple report
// export const getQualityReport = async (req, res) => {
//   try {
//     const userID = req.user.id;

//     const tests = await TestGeneration.findAll({ where: { userID } });

//     const totalTests = tests.length;

//     const avgScore =
//       tests.reduce((sum, t) => sum + (t.qualityScore || 0), 0) /
//       (totalTests || 1);

//     const avgCoverage =
//       tests.reduce((sum, t) => sum + (t.coverageEstimate || 0), 0) /
//       (totalTests || 1);

//     res.json({
//       totalTests,
//       averageScore: Math.round(avgScore),
//       averageCoverage: Math.round(avgCoverage),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error getting report" });
//   }
// };

// // role-based report
// export const getRoleBasedReport = async (req, res) => {
//   try {
//     const userID = req.user.id;
//     const role = req.query.role || "developer";

//     const tests = await TestGeneration.findAll({ where: { userID } });
//     const totalTests = tests.length;

//     const avgQuality = average(tests.map((t) => t.qualityScore || 0));
//     const avgCoverage = average(tests.map((t) => t.coverageEstimate || 0));

//     if (role === "developer") {
//       const frameworks = [...new Set(tests.map((t) => t.framework).filter(Boolean))];
//       const testDiversity = frameworks.length;

//       const frameworkUsage = testDiversity
//         ? Math.round(totalTests / testDiversity)
//         : 0;

//       return res.json({
//         averageQuality: Math.round(avgQuality),
//         averageCoverage: Math.round(avgCoverage),
//         assertionStrength: Math.round(avgQuality),
//         testDiversity,
//         frameworkUsage,
//       });
//     } else {
//       return res.json({
//         averageQuality: Math.round(avgQuality),
//         averageCoverage: Math.round(avgCoverage),
//         interactionCoverage: Math.round(avgCoverage),
//         workflowCoverage: Math.round(avgQuality),
//         totalTests,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error building report" });
//   }
// };




// Get all test reports for the user
// export const getAllQualityReports = async (req, res) => {
//   try {
//     const userID = req.user.id;

//     const tests = await TestGeneration.findAll({
//       where: { userID },
//       order: [["createdAt", "DESC"]],
//     });

//     const reports = tests.map((t) => {
//       let breakdown = t.breakdown || {};
//       if (!t.breakdown && t.testType === "unit") {
//         const result = calculateDeveloperScore(t.generatedCode, t.framework);
//         breakdown = result.breakdown;
//       }
//       return {
//         id: t.id,
//         testType: t.testType,
//         framework: t.framework,
//         qualityScore: t.qualityScore,
//         coverageEstimate: t.coverageEstimate,
//         feedback: Array.isArray(t.feedback)
//           ? t.feedback
//           : typeof t.feedback === "string"
//           ? JSON.parse(t.feedback || "[]")
//           : [],
//         breakdown,
//         createdAt: t.createdAt,
//       };
//     });

//     res.json({ reports });
//   } catch (error) {
//     console.error("Get all test reports error:", error);
//     res.status(500).json({ message: "Error getting test reports" });
//   }
// };

export const getAllQualityReports = async (req, res) => {
  try {
    const userID = req.user.id;

    const tests = await TestGeneration.findAll({
      where: { userID },
      order: [["createdAt", "DESC"]],
    });

    const reports = tests.map((t) => {
      // safely parse feedback
      let parsedFeedback = [];
      try {
        parsedFeedback = Array.isArray(t.feedback)
          ? t.feedback
          : typeof t.feedback === "string"
          ? JSON.parse(t.feedback || "[]")
          : [];
      } catch {
        parsedFeedback = [];
      }

      // safely parse breakdown
      let parsedBreakdown = null;
      try {
        parsedBreakdown =
          t.breakdown && typeof t.breakdown === "string"
            ? JSON.parse(t.breakdown)
            : t.breakdown || null;
      } catch {
        parsedBreakdown = null;
      }

      // backfill role for legacy rows where role was not persisted
      let reportRole = t.role;
      if (!reportRole) {
        const testTypeLower = (t.testType || "").toLowerCase();
        reportRole = ["ui", "workflow"].includes(testTypeLower)
          ? "qa"
          : "developer";
      }

      return {
        id: t.id,
        role: reportRole,
        testType: t.testType,
        framework: t.framework,
        qualityScore: t.qualityScore,
        coverageEstimate: t.coverageEstimate,
        feedback: parsedFeedback,
        breakdown: parsedBreakdown,
        createdAt: t.createdAt,
      };
    });

    res.json({ reports });
  } catch (error) {
    console.error("Get all test reports error:", error);
    res.status(500).json({ message: "Error getting test reports" });
  }
};


//get qa coverag ereports
export const getQACoverageReport = async (req, res) => {
  try {
    const userID = req.user.id;

    const tests = await TestGeneration.findAll({
      where: { userID: userID}
    });

    if (!tests.length) {
      return res.json({
        interactionCoverage: 0,
        workflowCoverage: 0,
        totalTests: 0
      });
    }

    let totalCoverage = 0;
    let interaction = 0;
    let workflow = 0;

    tests.forEach((t) => {
      totalCoverage += t.coverageEstimate || 0;

      if (t.testType === "ui") interaction++;
      if (t.testType === "workflow") workflow++;
    });

    res.json({
      interactionCoverage: Math.round((interaction / tests.length) * 100),
      workflowCoverage: Math.round((workflow / tests.length) * 100),
      totalTests: tests.length,
      averageCoverage: Math.round(totalCoverage / tests.length)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching QA report" });
  }
};

// Get detailed per-test QA coverage reports (like developer reports but for QA)
export const getQACoverageReports = async (req, res) => {
  try {
    const userID = req.user.id;

    const tests = await TestGeneration.findAll({
      where: { userID },
      order: [["createdAt", "DESC"]],
    });

    const reports = tests.map((t) => {
      // safely parse feedback
      let parsedFeedback = [];
      try {
        parsedFeedback = Array.isArray(t.feedback)
          ? t.feedback
          : typeof t.feedback === "string"
          ? JSON.parse(t.feedback || "[]")
          : [];
      } catch {
        parsedFeedback = [];
      }

      // safely parse breakdown
      let parsedBreakdown = null;
      try {
        parsedBreakdown =
          t.breakdown && typeof t.breakdown === "string"
            ? JSON.parse(t.breakdown)
            : t.breakdown || null;
      } catch {
        parsedBreakdown = null;
      }

      // backfill role for legacy rows
      let reportRole = t.role;
      if (!reportRole) {
        const testTypeLower = (t.testType || "").toLowerCase();
        reportRole = ["ui", "workflow"].includes(testTypeLower)
          ? "qa"
          : "developer";
      }

      return {
        id: t.id,
        role: reportRole,
        testType: t.testType,
        framework: t.framework,
        qualityScore: t.qualityScore,
        coverageEstimate: t.coverageEstimate,
        feedback: parsedFeedback,
        breakdown: parsedBreakdown,
        requirementText: t.requirementText,
        generatedCode: t.generatedCode,
        createdAt: t.createdAt,
      };
    });

    res.json({ reports });
  } catch (error) {
    console.error("Get QA coverage reports error:", error);
    res.status(500).json({ message: "Error getting QA coverage reports" });
  }
};