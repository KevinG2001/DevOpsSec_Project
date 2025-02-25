import React, { useState } from "react";
import axios from "axios";
import Style from "../styles/bookingModal.module.scss";
import { jwtDecode } from "jwt-decode";

// Extract user ID from token
const token = localStorage.getItem("token");
let decodedUserID: number | null = null;

if (token) {
  try {
    const decoded = jwtDecode<{ userID: number }>(token); // Ensure correct type
    decodedUserID = decoded.userID;
    console.log("Decoded User ID:", decodedUserID);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

interface Room {
  roomID: number;
  roomname: string;
  roomprice: number;
}

interface BookingModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  userID: number;
}

const BookingModal: React.FC<BookingModalProps> = ({ room, isOpen, onClose, userID }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !room) return null;

  // Use prop userID if available, otherwise use decoded token value
  const finalUserID = userID || decodedUserID;

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (!finalUserID) {
      setError("User ID not found. Please log in again.");
      return;
    }

    if (!room || !room.roomID) { // Ensure roomID exists
      setError("Room information is missing.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      console.log("Sending booking data:", {
        roomid: room.roomID,
        userid: finalUserID,
        datestart: checkInDate,
        dateend: checkOutDate,
      });

      const response = await axios.post("http://localhost:5000/api/bookings", {
        roomid: room.roomID,
        userid: finalUserID,
        datestart: checkInDate,
        dateend: checkOutDate,
      });

      console.log("Booking successful:", response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error("Error creating booking:", err);
      setError(err.response?.data?.error || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.modalOverlay} onClick={onClose}>
      <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={Style.closeButton} onClick={onClose}>X</button>
        <h2>Booking for {room.roomname}</h2>
        <p>€{room.roomprice} per night</p>

        {error && <p className={Style.errorMsg}>{error}</p>}
        {success ? (
          <p className={Style.successMsg}>Booking successful!</p>
        ) : (
          <>
            <div className={Style.dateContainer}>
              <label htmlFor="checkIn">Check-in Date:</label>
              <input
                id="checkIn"
                type="date"
                className={Style.dateInput}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className={Style.dateContainer}>
              <label htmlFor="checkOut">Check-out Date:</label>
              <input
                id="checkOut"
                type="date"
                className={Style.dateInput}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
            <button
              className={Style.confirmBtn}
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
