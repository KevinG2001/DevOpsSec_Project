const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files from the backend/public/dist directory
app.use(express.static(path.join(__dirname, "public", "dist")));

// Routes
const usersRoute = require("./routes/users");
app.use("/api/users", usersRoute);

const roomsRoutes = require("./routes/rooms");
app.use("/api/rooms", roomsRoutes);

const bookingsRoutes = require("./routes/bookings");
app.use("/api/bookings", bookingsRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Serve the frontend index.html if no API route matches
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
