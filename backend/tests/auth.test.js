const request = require("supertest");
const app = require("../server"); 
const pool = require("../database"); // Import database for test cleanup

require("dotenv").config();
process.env.NODE_ENV = "test"; // Ensure test mode

describe("Authentication API Tests", () => {
  beforeAll(async () => {
    // Clear test users before running tests
    await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
  });

  afterAll(async () => {
    // Close database connection after tests
    await pool.end();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstname: "John",
      surname: "Doe",
      email: "test@example.com",
      password: "password123",
      isAdmin: false,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should not register a user with an existing email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstname: "John",
      surname: "Doe",
      email: "test@example.com", 
      password: "password123",
      isAdmin: false,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "User already exists");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
