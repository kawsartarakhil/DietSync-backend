const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config();

// Connect database
connectDB();

const app = express();

// ─────────────────────────────
// Middleware
// ─────────────────────────────
app.use(cors());
app.use(express.json());

// ─────────────────────────────
// Swagger Docs
// ─────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─────────────────────────────
// Routes
// ─────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/meals", require("./routes/meals"));

// ─────────────────────────────
// Health Check
// ─────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DietSync API is running 🥗",
  });
});

// ─────────────────────────────
// 404 Handler
// ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─────────────────────────────
// Global Error Handler
// ─────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ─────────────────────────────
// Start Server (local only)
// ─────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}

// ─────────────────────────────
// Export for Vercel (serverless)
// ─────────────────────────────
module.exports = app;