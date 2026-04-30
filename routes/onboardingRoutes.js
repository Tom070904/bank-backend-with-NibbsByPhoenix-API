import express from "express";
import { verifyKYC } from "../controllers/onboardingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/verify", protect, verifyKYC);

export default router;