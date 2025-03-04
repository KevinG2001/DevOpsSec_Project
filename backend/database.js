const { Pool } = require("pg");
require("dotenv").config();

console.log("Initializing database connection...");
console.log("Database URL:", process.env.DATABASE_URL);

const sslCert = process.env.DB_SSL_CERTIFICATE
  ? Buffer.from(process.env.DB_SSL_CERTIFICATE, "base64").toString()
  : null;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL on Azure"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = pool;
