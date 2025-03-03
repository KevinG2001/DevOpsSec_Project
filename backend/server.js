const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend from backend/public/dist
app.use(express.static(path.join(__dirname, "public", "dist")));

// Catch-all route to serve index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

//Routes
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

// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
