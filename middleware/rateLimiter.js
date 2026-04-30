import rateLimit from "express-rate-limit";

// (all routes)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: {
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// limiter for auth (login/register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // only 10 attempts
  message: {
    message: "Too many login attempts, try again later",
  },
});

//  limiter for transfers
export const transferLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 transfers per minute
  message: {
    message: "Too many transfer attempts, slow down",
  },
});