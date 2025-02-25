const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query("SELECT * FROM bookings WHERE userId = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
