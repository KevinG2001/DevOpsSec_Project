import Style from "../styles/roomModal.module.scss";

const RoomModal = ({ room, isOpen, onClose, onBook }) => {
  if (!isOpen || !room) return null;

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
