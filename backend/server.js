const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend from backend/public/dist
app.use(express.static(path.join(__dirname, "public", "dist")));

// Catch-all route to serve index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// Routes
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const roomsRoutes = require("./routes/rooms");
app.use("/rooms", roomsRoutes);

const bookingsRoutes = require("./routes/bookings");
app.use("/api/bookings", bookingsRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });

// Export app for testing
module.exports = app;
