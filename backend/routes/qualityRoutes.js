import express from "express";
import {getAllQualityReports, getQACoverageReport} from "../controllers/qualityController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/quality-report", verifyToken, getAllQualityReports);
router.get("/qa-coverage-reports", verifyToken, getQACoverageReport);



export default router;