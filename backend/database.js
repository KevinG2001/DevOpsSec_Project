const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

const pool = new Pool({
  host: "bookitdbser.postgres.database.azure.com",
  user: "DevOpsAdmin",
  password: process.env.DB_PASSWORD,
  database: "postgres",
  port: 5432,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("certs/ca-cert.pem").toString(),
  },
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL on Azure"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = pool;
