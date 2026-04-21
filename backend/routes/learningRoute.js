import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getStudentDashboard,
  getStudentLearningHistory,
  getStudentProgressInsights,
  getStudentModuleProgress,
  updateStudentModuleProgress,
  getLearningModules,
  getQuizQuestions,
  submitQuiz,
  initializeQuizQuestions
} from "../controllers/learningController.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getStudentDashboard);
router.get("/learning-history", verifyToken, getStudentLearningHistory);
router.get("/progress-insights", verifyToken, getStudentProgressInsights);
router.get("/module-progress", verifyToken, getStudentModuleProgress);
router.post("/module-progress", verifyToken, updateStudentModuleProgress);
router.get("/modules", verifyToken, getLearningModules);
router.get("/quiz/:moduleID", verifyToken, getQuizQuestions);
router.post("/quiz/submit", verifyToken, submitQuiz);
router.post("/initialize-quiz", verifyToken, initializeQuizQuestions);

export default router;