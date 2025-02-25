import React, { useState } from "react";
import axios from "axios";
import Style from "../styles/bookingModal.module.scss";

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
  firstname: string;
}

const BookingModal: React.FC<BookingModalProps> = ({room, isOpen, onClose, userID, firstname, }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !room) return null;

  const handleBooking = async () => {
    // Validate that both dates are selected
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    // Clear any previous errors
    setError(null);
    setLoading(true);

    try {
      // POST booking details to backend
      const response = await axios.post("/api/bookings", {
        roomID: room.roomID,
        userID,
        firstname,
        dateStart: checkInDate,
        dateEnd: checkOutDate,
      });
      console.log("Booking successful:", response.data);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Booking failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.modalOverlay} onClick={onClose}>
      <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={Style.closeButton} onClick={onClose}>
          X
        </button>
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