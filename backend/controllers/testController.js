// import axios from "axios";
// import {TestGeneration} from "../models/syncModels.js";
// import { QueryTypes } from "sequelize";
// import { calculateDeveloperScore, calculateQAScore } from "../utils/scoreCalculator.js";

// // helper to compute averages
// function average(arr) {
//   if (!arr.length) return 0;
//   return arr.reduce((a,b)=>a+b,0) / arr.length;
// }
// //generate test
// export const generateTest = async (req,res) => {
//     try{
//         const {role, requirementText, framework, testType, testSubType} = req.body;
//         const userID = req.user.id;

//         //Call FastAPI
//         const aiResponse= await axios.post("http://localhost:8000/generate-test",
//         {role, requirementText, framework, testType, testSubType});

//         const generatedCode = aiResponse.data.testCode;
//         let qualityScore = 0;
//         let coverageEstimate = 0;
//         let feedback = [];

//         if (role === "developer") {
//           const result = calculateDeveloperScore(generatedCode, framework);
//           qualityScore = result.score;
//           feedback = result.feedback;
//         }

//         if (role === "qa") {
//           const result = calculateQAScore(generatedCode);
//           qualityScore = result.score;
//           coverageEstimate = result.coverage;
//           feedback = result.feedback;
//         }

//         //insert generated test data
//         const newTest = await TestGeneration.create({
//             userID, 
//             role, 
//             requirementText, 
//             generatedCode,
//             framework, 
//             testType: testType || testSubType || (role === "developer" ? "unit" : "ui"),
//             qualityScore,
//             coverageEstimate,
//         });

//         res.status(201).json({
//             id: newTest.id,
//             generatedCode,
//             framework,
//             role,
//             testType: newTest.testType,
//             createdAt: newTest.createdAt
//         });
//     }catch(error){
//         console.error("Generate test error:", error);
//         res.status(500).json({message:"Error generating test"});
//     }
// };

// //get total test generated
// export const getTotalGeneratedTests = async(req,res) =>{
//     try{
//         const userID = req.user.id;
//         const totalTests = await TestGeneration.count({where:{userID}});
//         res.json({totalTests});
//     }catch(error){
//         console.error("Get total generated test error:", error);
//         res.status(500).json({message:"Error getting total tests"});
//     }
// }

// // //get most used framework
// // export const getMostusedFramework = async(req,res) =>{
// //     try{
// //         const userID = req.user.id;
// //         const usedFramework = await TestGeneration.findOne({where:{userID}});
// //         res.json({usedFramework});
// //     }catch(error){
// //         console.error("Get most used framework error:", error);
// //         res.status(500).json({message:"Error getting most used framework"});
// //     }
// // }

// // //get last activity
// // export const getLastActivity = async(req,res) =>{
// //     try{
// //         const userID = req.user.id;
// //         const lastActivity = await TestGeneration.findOne({
// //             where:{userID},
// //             order:[["updatedAt","DESC"]],
// //         });
// //         res.json({lastActivity});
// //     }catch(error){
// //         console.error("Get last activity error:", error);
// //         res.status(500).json({message:"Error getting last activity"});
// //     }
// // }

// // get most used framework
// export const getMostusedFramework = async (req, res) => {
//   try {
//     const userID = req.user.id;

//     // Count occurrences of each framework and return the most used
//     const results = await TestGeneration.sequelize.query(
//       `SELECT framework, COUNT(*) AS count
//        FROM \`test\`
//        WHERE \`userID\` = :userID
//        GROUP BY framework
//        ORDER BY count DESC
//        LIMIT 1`,
//       { replacements: { userID }, type: QueryTypes.SELECT }
//     );

//     const mostUsedFramework = results[0]?.framework || "-";
//     res.json({ mostUsedFramework });
//   } catch (error) {
//     console.error("Get most used framework error:", error);
//     res.status(500).json({ message: "Error getting most used framework" });
//   }
// };

// // get last activity
// export const getLastActivity = async (req, res) => {
//   try {
//     const userID = req.user.id;
//     const lastActivity = await TestGeneration.findOne({
//       where: { userID },
//       order: [["updatedAt", "DESC"]],
//     });

//     res.json({ lastActivity }); // Sequelize object
//   } catch (error) {
//     console.error("Get last activity error:", error);
//     res.status(500).json({ message: "Error getting last activity" });
//   }
// };

// //get recent tests
// export const getRecentTests = async (req,res) =>{
//   try{
//     const userID = req.user.id;
//     const recentTests = await TestGeneration.findAll({
//       where:{userID},
//       order:[["createdAt", "DESC"]],
//       limit:5,
//     });
//     res.json({ recentTests });
//   }catch(error){
//     console.error("Get recent tests error:", error);
//     res.status(500).json({ message: "Error getting recent tests" });
//   }
// };

// //get full test history
// export const getFullTestHistory = async (req,res) =>{
//   try{
//     const userID = req.user.id;
//     const recentTests = await TestGeneration.findAll({
//       where:{userID},
//       order:[["createdAt", "DESC"]],
//     });
//     res.json({ recentTests });
//   }catch(error){
//     console.error("Get full test history error:", error);
//     res.status(500).json({ message: "Error getting full test history" });
//   }
// };

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

//     // result will be an array with one entry even if no rows exist
//     const avgScore = result?.[0]?.dataValues?.avgScore;
//     res.json({
//       averageQualityScore: Math.round(avgScore || 0),
//     });
//   } catch (error) {
//     console.error("Get average quality score error:", error);
//     res.status(500).json({ message: "Error getting average quality score" });
//   }
// };

// export const getQualityReport = async (req, res) => {
//   const userID = req.user.id;

//   const tests = await TestGeneration.findAll({ where: { userID } });

//   const totalTests = tests.length;

//   const avgScore =
//     tests.reduce((sum, t) => sum + (t.qualityScore || 0), 0) /
//     (totalTests || 1);

//   const avgCoverage =
//     tests.reduce((sum, t) => sum + (t.coverageEstimate || 0), 0) /
//     (totalTests || 1);

//   res.json({
//     totalTests,
//     averageScore: Math.round(avgScore),
//     averageCoverage: Math.round(avgCoverage),
//   });
// };

// // new unified report endpoint for both developer/qa dashboards
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
//       // qa metrics
//       return res.json({
//         averageQuality: Math.round(avgQuality),
//         averageCoverage: Math.round(avgCoverage),
//         interactionCoverage: Math.round(avgCoverage),
//         workflowCoverage: Math.round(avgQuality),
//         totalTests,
//       });
//     }
//   } catch (error) {
//     console.error("Error building role based report", error);
//     res.status(500).json({ message: "Error building report" });
//   }
// };


// // ===== TEST EXPORT FUNCTIONALITY =====

export const exportTest = async (req, res) => {
  try {
    // 1. Extract request data
    const { testId, targetFramework } = req.body;
    const userID = req.user.id;

    // Validate input
    if (!testId || !targetFramework) {
      return res.status(400).json({
        message: "testId and targetFramework are required",
      });
    }

    // 2. Fetch test from database
    const test = await TestGeneration.findOne({
      where: { id: testId, userID }, // Ensure user owns this test
    });

    // 3. Check if test exists
    if (!test) {
      return res
        .status(404)
        .json({ message: "Test not found or access denied" });
    }

    // 4. Get the generated code
    const generatedCode = test.generatedCode;
    if (!generatedCode) {
      return res.status(400).json({ message: "No generated code found" });
    }

    // 5. Import helper functions
    const {
      convertFormat,
      buildFileContent,
      getFileExtension,
      getMimeType,
    } = await import("../utils/testExporter.js");

    // 6. Convert code to target framework
    const convertedCode = convertFormat(
      generatedCode,
      test.framework,
      targetFramework
    );

    // 7. Build complete file with imports
    const fileContent = buildFileContent(convertedCode, targetFramework);

    // 8. Get file extension
    const fileExtension = getFileExtension(targetFramework);
    const mimeType = getMimeType(targetFramework);

    // 9. Generate filename
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `${test.role}_test_${timestamp}.${fileExtension}`;

    // 10. Send as downloadable file
    res.setHeader("Content-Type", mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    res.send(fileContent);

  } catch (error) {
    console.error("Export test error:", error);
    res.status(500).json({ message: "Error exporting test", error: error.message });
  }
};



import axios from "axios";
import { TestGeneration } from "../models/syncModels.js";
import { QueryTypes } from "sequelize";
import { calculateDeveloperScore, calculateQAScore } from "../utils/scoreCalculator.js";

// generate test
export const generateTest = async (req, res) => {
  try {
    const { role, requirementText, framework, testType, testSubType } = req.body;
    const userID = req.user.id;

    const aiResponse = await axios.post("http://localhost:8000/generate-test", {
      role,
      requirementText,
      framework,
      testType,
      testSubType,
    });

    //const generatedCode = aiResponse.data.testCode;
    const generatedCode = aiResponse.data.testCode || aiResponse.data.generatedCode || "";

    let qualityScore = 0;
    let coverageEstimate = 0;
    let feedback = [];
    let breakdown = null;
    
    if (role === "developer") {
      const result = calculateDeveloperScore(generatedCode, framework);
      qualityScore = result.score;
      feedback = result.feedback;
      breakdown = result.breakdown;
    }

    if (role === "qa") {
      const result = calculateQAScore(generatedCode);
      qualityScore = result.score;
      coverageEstimate = result.coverage;
      feedback = result.feedback;
    }

    if (role === "student") {
      qualityScore = null;
      coverageEstimate = null;
      feedback = [];
      breakdown = null;
    }

    const newTest = await TestGeneration.create({
      userID,
      role,
      requirementText,
      generatedCode,
      framework,
      testType: testType || testSubType || (role === "developer" ? "unit" : "ui"),
      qualityScore,
      coverageEstimate,
      feedback,
      breakdown
    });

    res.status(201).json({
      id: newTest.id,
      generatedCode,
      framework,
      role,
      testType: newTest.testType,
      createdAt: newTest.createdAt,
    });
  } catch (error) {
    console.error("Generate test error:", error);
    res.status(500).json({ message: "Error generating test" });
  }
};

// get total tests
export const getTotalGeneratedTests = async (req, res) => {
  try {
    const userID = req.user.id;
    const totalTests = await TestGeneration.count({ where: { userID } });
    res.json({ totalTests });
  } catch (error) {
    res.status(500).json({ message: "Error getting total tests" });
  }
};

// most used framework
export const getMostusedFramework = async (req, res) => {
  try {
    const userID = req.user.id;

    const results = await TestGeneration.sequelize.query(
      `SELECT framework, COUNT(*) AS count
       FROM \`test\`
       WHERE \`userID\` = :userID
       GROUP BY framework
       ORDER BY count DESC
       LIMIT 1`,
      { replacements: { userID }, type: QueryTypes.SELECT }
    );

    const mostUsedFramework = results[0]?.framework || "-";
    res.json({ mostUsedFramework });
  } catch (error) {
    res.status(500).json({ message: "Error getting most used framework" });
  }
};

//average quality
export const getAverageQuality = async (req, res) => {
  try {
    const userID = req.user.id;

    const result = await TestGeneration.findAll({
      where: { userID },
      attributes: [
        [
          TestGeneration.sequelize.fn(
            "AVG",
            TestGeneration.sequelize.col("qualityScore")
          ),
          "averageQualityScore",
        ],
      ],
      raw: true,
    });

    const avg = result[0]?.averageQualityScore || 0;

    res.json({
      averageQualityScore: Math.round(avg),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting average quality",
    });
  }
};

// last activity
export const getLastActivity = async (req, res) => {
  try {
    const userID = req.user.id;

    const lastActivity = await TestGeneration.findOne({
      where: { userID },
      order: [["updatedAt", "DESC"]],
    });

    res.json({ lastActivity });
  } catch (error) {
    res.status(500).json({ message: "Error getting last activity" });
  }
};

// recent tests
export const getRecentTests = async (req, res) => {
  try {
    const userID = req.user.id;

    const recentTests = await TestGeneration.findAll({
      where: { userID },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json({ recentTests });
  } catch (error) {
    res.status(500).json({ message: "Error getting recent tests" });
  }
};

// full history
export const getFullTestHistory = async (req, res) => {
  try {
    const userID = req.user.id;

    const recentTests = await TestGeneration.findAll({
      where: { userID },
      order: [["createdAt", "DESC"]],
    });

    res.json({ recentTests });
  } catch (error) {
    res.status(500).json({ message: "Error getting full test history" });
  }
};