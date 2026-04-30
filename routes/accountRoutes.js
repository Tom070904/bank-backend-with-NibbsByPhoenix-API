import express from "express";
import { createAccount } from "../controllers/accountController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getBalance } from "../controllers/accountController.js";

const router = express.Router();

router.post("/create", protect, createAccount);
router.get("/balance", protect, getBalance);

export default router;