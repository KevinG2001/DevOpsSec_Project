const express = require("express");
const db = require("../database");
const router = express.Router();

// Add a new booking
router.post("/create", async (req, res) => {
  try {
    const { userid, firstname, roomid, datestart, dateend } = req.body;

    if (!userid || !firstname || !roomid || !datestart || !dateend) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await db.query(
      "INSERT INTO bookings (userid, firstname, roomid, datestart, dateend) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userid, firstname, roomid, datestart, dateend]
    );

    res
      .status(201)
      .json({ message: "Booking created!", booking: result.rows[0] });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all bookings (Admin only)
router.get("/all", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bookings");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all bookings for a specific user
router.get("/all/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const result = await db.query("SELECT * FROM bookings WHERE userid = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a booking
router.delete("/delete/:bookingId", async (req, res) => {
  try {
    const bookingId = Number(req.params.bookingId);
    if (!bookingId) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const result = await db.query(
      "DELETE FROM bookings WHERE bookingid = $1 RETURNING *",
      [bookingId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      deletedBooking: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
