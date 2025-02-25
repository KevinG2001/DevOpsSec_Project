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

// Add a new booking
router.post("/", async (req, res) => {
  try {
    const { userid, roomid, datestart, dateend } = req.body;

    if (!userid || !roomid || !datestart || !dateend) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await db.query(
      "INSERT INTO bookings (userid, roomid, datestart, dateend) VALUES ($1, $2, $3, $4) RETURNING *",
      [userid, roomid, datestart, dateend]
    );

    res.status(201).json({ message: "Booking created!", booking: result.rows[0] });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
