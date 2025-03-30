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

router.put("/update/:userid", async (req, res) => {
  const { userid } = req.params;
  const { firstname, surname, email, isadmin } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE userid = $1",
      [userid]
    );

    if (existingUser.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = {
      firstname: firstname || existingUser.rows[0].firstname,
      surname: surname || existingUser.rows[0].surname,
      email: email || existingUser.rows[0].email,
      isadmin: isadmin !== undefined ? isadmin : existingUser.rows[0].isadmin,
    };

    const result = await pool.query(
      "UPDATE users SET firstname = $1, surname = $2, email = $3, isadmin = $4 WHERE userid = $5 RETURNING *",
      [
        updatedUser.firstname,
        updatedUser.surname,
        updatedUser.email,
        updatedUser.isadmin,
        userid,
      ]
    );

    res.status(200).json({
      message: "User updated successfully",
      updatedUser: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
