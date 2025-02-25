import Style from "../styles/roomModal.module.scss";
import { jwtDecode } from "jwt-decode";

const RoomModal = ({ room, isOpen, onClose, onBook, onEdit, onRemove }) => {
  if (!isOpen || !room) return null;

  // Get the token from localStorage
  const token = localStorage.getItem("token");
  let isAdmin = false;

  //Checking if the token is valid
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <div className={Style.modalOverlay} onClick={onClose}>
      <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={Style.closeButton} onClick={onClose}>
          X
        </button>
        <img
          src={room.roomurl}
          alt={room.roomname}
          className={Style.modalImage}
        />
        <div className={Style.modalTextWrapper}>
          <div>{room.roomname}</div>
          <div>{room.roomdescription}</div>
          <div>€{room.roomprice}</div>
          <div className={Style.modalBtnWrapper}>
            <button className={Style.modalBtn} onClick={onBook}>
              Book
            </button>

            {isAdmin && (
              <>
                <button className={Style.modalBtn} onClick={onEdit}>
                  Edit
                </button>
                <button className={Style.modalBtn} onClick={onRemove}>
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
