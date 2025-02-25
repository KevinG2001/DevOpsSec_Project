const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM rooms ORDER BY roomID DESC LIMIT 8"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cant get latest rooms" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM rooms");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cant get all rooms" });
  }
});

module.exports = router;
