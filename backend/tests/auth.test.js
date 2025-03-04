const request = require("supertest");
const app = require("../server");
const pool = require("../database");

require("dotenv").config();
process.env.NODE_ENV = "test";

jest.setTimeout(30000);

describe("Authentication API Tests", () => {
  beforeAll(async () => {
    console.log("Clearing test users before running tests...");
    try {
      await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
    } catch (error) {
      console.error("Error clearing test users:", error);
    }
  });

  afterEach(async () => {
    console.log("Cleaning up test users...");
    try {
      await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
    } catch (error) {
      console.error("Error cleaning up test users:", error);
    }
  });

  afterAll(async () => {
    console.log("Closing database connection...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await pool.end({ timeout: 5000 });
      console.log("Database connection closed successfully");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
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
    await request(app).post("/api/auth/register").send({
      firstname: "John",
      surname: "Doe",
      email: "test@example.com",
      password: "password123",
      isAdmin: false,
    });

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
    await request(app).post("/api/auth/register").send({
      firstname: "John",
      surname: "Doe",
      email: "test@example.com",
      password: "password123",
      isAdmin: false,
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
