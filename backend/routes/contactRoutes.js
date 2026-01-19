import express from "express";
import rateLimit from "express-rate-limit";
import { body } from "express-validator";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

// Rate limiting (max 2 requests per 5 minutes from same IP)
const contactLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 3,
  message: { success: false, error: "Too many messages, please try again later" },
});

// Validation rules
const contactValidation = [
  body("name").isString().isLength({ min: 2 }).trim(),
  body("email").isEmail().normalizeEmail(),
  body("message").isString().isLength({ min: 5, max: 1000 }).trim(),
];

// POST /api/contact (secured)
router.post("/", contactLimiter, contactValidation, sendMessage);

export default router;
