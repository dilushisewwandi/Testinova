import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {getStudentDashboard,getStudentLearningHistory,getStudentProgress, getStudentProgressInsights} from "../controllers/learningController.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getStudentDashboard);
router.get("/learning-history", verifyToken, getStudentLearningHistory);
router.get("/progress", verifyToken, getStudentProgress);
router.get("/progress-insights", verifyToken, getStudentProgressInsights);

export default router;