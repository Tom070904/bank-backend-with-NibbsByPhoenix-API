import express from "express";
import {
  sendMoney,
  getHistory,
  verifyAccount,
} from "../controllers/transferController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkTransactionStatus } from "../controllers/transferController.js";
import { transferLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/send", transferLimiter, protect, sendMoney);
router.get("/history", protect, getHistory);
router.post("/verify-account", protect, verifyAccount);
router.get("/status/:id", protect, checkTransactionStatus);

export default router;