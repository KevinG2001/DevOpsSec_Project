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

//Get all the routes for the user
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

//Delete booking
router.delete("/delete/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ error: "Booking ID is required" });
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
