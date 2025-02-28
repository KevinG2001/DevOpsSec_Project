const request = require("supertest");
const app = require("../server");

describe("Rooms API Tests", () => {
  it("should fetch all rooms", async () => {
    const res = await request(app).get("/rooms/all");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should fetch the latest 8 rooms", async () => {
    const res = await request(app).get("/rooms/latest");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeLessThanOrEqual(8);
  });
});
