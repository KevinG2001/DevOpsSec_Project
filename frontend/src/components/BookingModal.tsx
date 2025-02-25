import Style from "../styles/bookingModal.module.scss";

const BookingModal = ({ room, isOpen, onClose }) => {
  if (!isOpen || !room) return null;

  return (
    <div className={Style.modalOverlay} onClick={onClose}>
      <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={Style.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Booking for {room.roomname}</h2>
        <p>€{room.roomprice} per night</p>
        <input type="date" className={Style.dateInput} />
        <button className={Style.confirmBtn}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default BookingModal;
