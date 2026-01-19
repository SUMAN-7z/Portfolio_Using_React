import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

/* ================================
   SECURE CORS CONFIG (POST ONLY)
================================ */
const corsOptions = {
  origin: "http://localhost:5173", // CHANGE in production
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ✅ FIX: use regex instead of "*"
app.options(/.*/, cors(corsOptions));

/* ================================
   BLOCK NON-POST REQUESTS
================================ */
app.use((req, res, next) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    return res.status(405).json({ message: "404 brain. 405 method." });
  }
  next();
});

/* ================================
   BODY PARSER
================================ */
app.use(express.json());

/* ================================
   ROUTES
================================ */
app.use("/api/contact", contactRoutes);

/* ================================
   DATABASE
================================ */
connectDB();

/* ================================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
