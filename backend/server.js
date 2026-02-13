import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

/* ================================
   DATABASE CONNECT
================================ */
connectDB();

/* ================================
   CORS CONFIG
================================ */
const corsOptions = {
  origin: process.env.frontend_url,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* ================================
   BODY PARSER
================================ */
app.use(express.json());

/* ================================
   ROUTES
================================ */
app.use("/api/contact", contactRoutes);

/* ================================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ================================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* ================================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
