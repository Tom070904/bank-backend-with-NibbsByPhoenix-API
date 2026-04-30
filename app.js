import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import { globalLimiter } from "./middleware/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(globalLimiter);


app.get("/", (req, res) => {
  res.send("Digital Bank API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transfer", transferRoutes);

export default app;