import express from "express";
import {getAllQualityReports, getQACoverageReport, getQACoverageReports} from "../controllers/qualityController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/quality-report", verifyToken, getAllQualityReports);
router.get("/qa-report", verifyToken, getQACoverageReport);
router.get("/qa-coverage-reports", verifyToken, getQACoverageReports);


export default router;