import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Booking {
  bookingid: number;
  userid: number;
  firstname: string;
  roomid: number;
  datestart: string;
  dateend: string;
}

interface DecodedToken {
  userID: number;
  isAdmin: boolean;
  exp: number;
}

function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  let userId: number | null = null;
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = decoded.userID;
    } catch (err) {
      console.error("Invalid token", err);
      userId = null;
    }
  }

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/all/${userId}`);
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.bookings || [];
        setBookings(data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (!userId) {
    return <p>Please log in to view your bookings.</p>;
  }

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Booking ID</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Room ID</th>
              <th style={{ textAlign: "left", padding: "8px" }}>First Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Check-in Date</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Check-out Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingid} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{booking.bookingid}</td>
                <td style={{ padding: "8px" }}>{booking.roomid}</td>
                <td style={{ padding: "8px" }}>{booking.firstname}</td>
                <td style={{ padding: "8px" }}>{booking.datestart}</td>
                <td style={{ padding: "8px" }}>{booking.dateend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
