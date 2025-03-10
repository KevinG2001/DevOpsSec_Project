const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../database");
require("dotenv").config();

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { firstname, surname, email, password, isAdmin = false } = req.body; // Default isAdmin to false

    // Validate input
    if (!firstname || !surname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database with isAdmin
    const newUser = await pool.query(
      "INSERT INTO users (firstname, surname, email, password, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstname, surname, email, hashedPassword, isAdmin]
    );

    res.status(201).json({
      message: "User registered successfully!",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received login request for:", email);

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("User found:", user.rows[0]);

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userID: user.rows[0].userid,
        firstname: user.rows[0].firstname,
        isAdmin: user.rows[0].isadmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful!",
      token,
      firstname: user.rows[0].firstname,
      isAdmin: user.rows[0].isadmin,
    });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
