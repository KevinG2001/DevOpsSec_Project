const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => {
    console.log("Database connection established successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });

module.exports = pool;
