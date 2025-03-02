import React, { useState } from "react";
import Style from "../styles/bookingModal.module.scss";
import useBookings from "../util/useBookings";
import useUser from "../util/useUser";
import { Room } from "../util/types";

interface BookingModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  room,
  isOpen,
  onClose,
}) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const { userId, firstname } = useUser();
  const { createBooking, loading, error, success } = useBookings();

  if (!isOpen || !room) return null;

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Select check-in and check-out dates.");
      return;
    }

    if (!userId) {
      alert("User not found. Please log in.");
      return;
    }

    await createBooking({
      roomid: room!.roomid,
      userid: userId,
      firstname: firstname || "Guest",
      datestart: checkInDate,
      dateend: checkOutDate,
    });
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
              <label>Check-in Date:</label>
              <input
                type="date"
                className={Style.dateInput}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className={Style.dateContainer}>
              <label>Check-out Date:</label>
              <input
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
