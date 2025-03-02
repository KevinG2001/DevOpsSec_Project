import { useState } from "react";
import Style from "../styles/roomModal.module.scss";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const RoomModal = ({
  room,
  isOpen,
  onClose,
  onBook,
  onRemove,
  refreshRooms,
}) => {
  if (!isOpen || !room) return null;

  // Get the token from localStorage
  const token = localStorage.getItem("token");
  let isAdmin = false;

  // Checking if the token is valid
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  const [roomname, setRoomname] = useState(room.roomname);
  const [roomdescription, setRoomdescription] = useState(room.roomdescription);
  const [roomprice, setRoomprice] = useState(room.roomprice);

  const updateRoom = async () => {
    if (!room || !room.roomid) {
      console.error("Error: roomid is missing or undefined!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/rooms/update/${room.roomid}`,
        { roomname, roomdescription, roomprice }
      );

      setIsEditing(false);

      if (refreshRooms) {
        refreshRooms();
      } else {
        console.warn("refreshRooms is not defined!");
      }
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Failed to update room.");
    }
  };

  const deleteRoom = async (roomid: number) => {
    try {
      await axios.delete(`http://localhost:5000/rooms/delete/${roomid}`);
      if (refreshRooms) {
        refreshRooms();
      } else {
        console.warn("refreshRooms is not defined!");
      }
    } catch (err) {
      console.error("Problem deleting room");
    }
  };

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
                onChange={(e) => setRoomprice(e.target.value)}
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
