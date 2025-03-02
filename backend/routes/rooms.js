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

router.put("/update/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { roomname, roomdescription, roomprice } = req.body;

    const existingRoom = await db.query(
      "SELECT * FROM rooms WHERE roomid = $1",
      [roomId]
    );

    if (existingRoom.rowCount === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Merge existing values with new values (keep unchanged fields)
    //Allows one thing to change instead of causing error
    const updatedRoom = {
      roomname: roomname || existingRoom.rows[0].roomname,
      roomdescription: roomdescription || existingRoom.rows[0].roomdescription,
      roomprice: roomprice || existingRoom.rows[0].roomprice,
    };

    const result = await db.query(
      "UPDATE rooms SET roomname = $1, roomdescription = $2, roomprice = $3 WHERE roomid = $4 RETURNING *",
      [
        updatedRoom.roomname,
        updatedRoom.roomdescription,
        updatedRoom.roomprice,
        roomId,
      ]
    );

    res.status(200).json({
      message: "Room updated successfully",
      updatedRoom: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating room:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
