import express from "express";
import { setRole } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.put("/set-role", verifyToken, setRole);

export default router;