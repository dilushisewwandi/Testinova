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
      requirement: requirementText,
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
      //feedback = result.feedback;
      feedback = (result.feedback || []).map(f => {
        if (typeof f === "string") {
          return { type: "info", message: f };
        }
        return f;
      });
    //   feedback: (() => {
    //   const parsed = parseJSON(t.feedback);
    //   return Array.isArray(parsed) ? parsed : [];
    // })();
      breakdown = result.breakdown;
    }

    if (role === "qa") {
      const result = calculateQAScore(generatedCode);
      qualityScore = result.score;
      coverageEstimate = result.coverage;
      // feedback = result.feedback;
        feedback = (result.feedback || []).map(f => {
    if (typeof f === "string") {
        return { type: "info", message: f };
        }
        return f;
      });
//       feedback: (() => {
//   const parsed = parseJSON(t.feedback);
//   return Array.isArray(parsed) ? parsed : [];
// })()
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
      requirement: requirementText,
      generatedCode,
      framework,
      testType: testType || testSubType || (role === "developer" ? "unit" : "ui"),
      qualityScore,
      coverageEstimate,
      feedback,
      breakdown,
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




