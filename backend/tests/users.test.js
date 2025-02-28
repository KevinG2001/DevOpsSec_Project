const request = require("supertest");
const app = require("../server");

describe("Users API Tests", () => {
  it("should fetch all users", async () => {
    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
