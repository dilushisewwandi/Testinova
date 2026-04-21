import { TestGeneration } from "../models/syncModels.js";

export const exportTest = async (req, res) => {
  try {
    const { testId, targetFramework } = req.body;
    const userID = req.user.id;

    if (!testId || !targetFramework) {
      return res.status(400).json({
        message: "testId and targetFramework are required",
      });
    }

    const test = await TestGeneration.findOne({
      where: { id: testId, userID },
    });

    if (!test) {
      return res.status(404).json({
        message: "Test not found or access denied",
      });
    }

    const generatedCode = test.generatedCode;

    if (!generatedCode) {
      return res.status(400).json({
        message: "No generated code found",
      });
    }

    const {
      convertFormat,
      buildFileContent,
      getFileExtension,
      getMimeType,
    } = await import("../utils/testExporter.js");

    const convertedCode = convertFormat(
      generatedCode,
      test.framework,
      targetFramework
    );

    const fileContent = buildFileContent(convertedCode, targetFramework);

    const fileExtension = getFileExtension(targetFramework);
    const mimeType = getMimeType(targetFramework);

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `${test.role}_test_${timestamp}.${fileExtension}`;

    res.setHeader("Content-Type", mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    res.send(fileContent);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({
      message: "Error exporting test",
      error: error.message,
    });
  }
};