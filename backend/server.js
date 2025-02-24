const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const roomsRoutes = require("./routes/rooms");
app.use("/rooms", roomsRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
