const request = require("supertest");
const app = require("../server");

describe("Bookings API Tests", () => {
  let bookingId;
  let userId = 6; 


  it("should get all bookings for a user", async () => {
    const res = await request(app).get(`/api/bookings/all/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should not create a booking with missing fields", async () => {
    const res = await request(app).post("/api/bookings/create").send({
      userid: userId,
      roomid: 101,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "All fields are required");
  });
});
