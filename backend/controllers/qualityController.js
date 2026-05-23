import { TestGeneration } from "../models/syncModels.js";

function getRole(testType, role) {
  if (role) return role;

  const type = (testType || "").toLowerCase();
  if (type === "ui" || type === "workflow") return "qa";
  return "developer";
}


function parseJSON(data) {
  try {
    if (!data) return null;
    if (typeof data === "string") return JSON.parse(data);
    return data;
  } catch {
    return null;
  }
}


export const getAllQualityReports = async (req, res) => {
  try {
    const userID = req.user.id;

    const tests = await TestGeneration.findAll({
      where: { userID },
      order: [["createdAt", "DESC"]],
    });

    const reports = tests.map((t) => ({
      id: t.id,
      role: getRole(t.testType, t.role),
      testType: t.testType,
      framework: t.framework,
      qualityScore: t.qualityScore,
      coverageEstimate: t.coverageEstimate,
      feedback: parseJSON(t.feedback) || [],
      breakdown: parseJSON(t.breakdown),
      createdAt: t.createdAt,
    }));

    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting reports" });
  }
};



export const getQACoverageReport = async (req, res) => {
  try {
    const userID = req.user.id;

    const tests = await TestGeneration.findAll({
      where: { userID },
      order: [["createdAt", "DESC"]],
    });

    const reports = tests
      .map((t) => {
        const type = (t.testType || "").toLowerCase();

        const role =
          t.role ||
          (type === "ui" || type === "workflow" ? "qa" : "developer");

        return {
          id: t.id,
          role,
          testType: t.testType,
          framework: t.framework,
          qualityScore: t.qualityScore || 0,
          coverageEstimate: t.coverageEstimate || 0,
          feedback: parseJSON(t.feedback) || [],
          breakdown: parseJSON(t.breakdown),
          requirementText: t.requirement,
          generatedCode: t.generatedCode,
          createdAt: t.createdAt,
        };
      })
      .filter((t) => t.role === "qa");

    res.json({ reports });
  } catch (error) {
    console.error("QA Coverage Error:", error);
    res.status(500).json({ message: "Error fetching QA report" });
  }
};