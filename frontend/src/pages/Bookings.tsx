import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../util/useUser";
import { Booking } from "../util/types";

function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/all/${userId}`
        );
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

  const deleteBooking = async (bookingid: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/delete/${bookingid}`
      );
      setBookings((prevBookings) =>
        prevBookings.filter((b) => b.bookingid !== bookingid)
      );
    } catch (err) {
      console.error("Problem deleting booking", err);
    }
  };

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
              <th style={{ textAlign: "left", padding: "8px" }}>
                Check-in Date
              </th>
              <th style={{ textAlign: "left", padding: "8px" }}>
                Check-out Date
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.bookingid}
                style={{ borderBottom: "1px solid #eee" }}
              >
                <td style={{ padding: "8px" }}>{booking.bookingid}</td>
                <td style={{ padding: "8px" }}>{booking.roomid}</td>
                <td style={{ padding: "8px" }}>{booking.firstname}</td>
                <td style={{ padding: "8px" }}>{booking.datestart}</td>
                <td style={{ padding: "8px" }}>{booking.dateend}</td>
                <button onClick={() => deleteBooking(booking.bookingid)}>
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
