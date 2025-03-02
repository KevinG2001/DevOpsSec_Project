import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/bookings.module.scss";

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
    return <p className={styles.message}>Please log in to view your bookings.</p>;
  }

  if (loading) {
    return <p className={styles.message}>Loading bookings...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className={styles.message}>No bookings found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room ID</th>
              <th>First Name</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingid}>
                <td>{booking.bookingid}</td>
                <td>{booking.roomid}</td>
                <td>{booking.firstname}</td>
                <td>{booking.datestart}</td>
                <td>{booking.dateend}</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => deleteBooking(booking.bookingid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
