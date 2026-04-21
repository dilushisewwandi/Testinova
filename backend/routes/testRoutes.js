import express from "express";
import {generateTest,getAverageQuality,getFullTestHistory,getLastActivity,getMostusedFramework,getRecentTests,getTotalGeneratedTests,} from "../controllers/testController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", verifyToken, generateTest);
router.get("/total", verifyToken, getTotalGeneratedTests);
router.get("/most-used-framework", verifyToken, getMostusedFramework);
router.get("/average-quality", verifyToken, getAverageQuality);
router.get("/last-activity", verifyToken, getLastActivity);
router.get("/recent-tests", verifyToken, getRecentTests);
router.get("/history", verifyToken, getFullTestHistory);


export default router;