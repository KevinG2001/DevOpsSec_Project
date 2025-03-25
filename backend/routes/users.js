const express = require("express");
const pool = require("../database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/delete/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE userid = $1 RETURNING *",
      [userid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
