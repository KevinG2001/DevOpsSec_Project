import Style from "../styles/roomModal.module.scss";
import useRooms from "../util/useRooms";
import { RoomModalProps } from "../util/types";

const RoomModal: React.FC<RoomModalProps> = ({
  room,
  isOpen,
  onClose,
  onBook,
  refreshRooms,
}) => {
  const {
    isAdmin,
    isEditing,
    setIsEditing,
    roomname,
    setRoomname,
    roomdescription,
    setRoomdescription,
    roomprice,
    setRoomprice,
    updateRoom,
    deleteRoom,
  } = useRooms(room, refreshRooms);

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
          {isEditing ? (
            <>
              <input
                type="text"
                value={roomname}
                onChange={(e) => setRoomname(e.target.value)}
              />
              <textarea
                value={roomdescription}
                onChange={(e) => setRoomdescription(e.target.value)}
              />
              <input
                type="number"
                value={roomprice}
                onChange={(e) => setRoomprice(Number(e.target.value))}
              />
              <button onClick={updateRoom} className={Style.modalBtn}>
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={Style.modalBtn}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>{room.roomname}</div>
              <div>{room.roomdescription}</div>
              <div>€{room.roomprice}</div>
              <div className={Style.modalBtnWrapper}>
                <button className={Style.modalBtn} onClick={onBook}>
                  Book
                </button>
                {isAdmin && (
                  <>
                    <button
                      className={Style.modalBtn}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button
                      className={Style.modalBtn}
                      onClick={() => deleteRoom(room.roomid)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
