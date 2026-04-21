import express from "express";
import {exportTest} from "../controllers/testController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/export", verifyToken, exportTest);


export default router;