const { Pool } = require("pg");
require("dotenv").config();

console.log("Initializing database connection...");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: true,
    ca: Buffer.from(process.env.DB_SSL_CERT, "base64").toString(),
  },
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL on Azure"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = pool;
