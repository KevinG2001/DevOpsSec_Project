const { Pool } = require("pg");
require("dotenv").config();

let connectionConfig;

if (process.env.NODE_ENV === "test" && process.env.CI) {
  console.log("Using CI test database connection");
  connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  };
} else {
  console.log("Using standard database connection");
  if (process.env.DATABASE_URL) {
    connectionConfig = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  } else {
    connectionConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 5432,
      ssl: { rejectUnauthorized: false },
    };
  }
}

console.log(
  "Database connection details:",
  process.env.NODE_ENV === "test"
    ? `Using ${process.env.CI ? "CI" : "local"} test database`
    : `Using database at ${
        connectionConfig.connectionString || connectionConfig.host
      }`
);

const pool = new Pool(connectionConfig);

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = pool;
