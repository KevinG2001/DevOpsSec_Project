import { useEffect, useState } from "react";
import Style from "../styles/roomCard.module.scss";
import RoomModal from "./RoomModal";
import BookingModal from "./BookingModal";

const RoomList = ({ fetchUrl }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("room");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        console.log(data);
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms", err);
      }
    };
    fetchRooms();
  }, [fetchUrl]);

  const openRoomModal = (room) => {
    setSelectedRoom(room);
    setModalType("room");
    setIsModalOpen(true);
  };

  const openBookingModal = () => {
    setModalType("booking");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setModalType("room");
  };

  return (
    <>
      <div className={Style.lastestRoomContainer}>
        <div className={Style.latestRoomTitle}>Latest Rooms</div>
        <div className={Style.latestRoomWrapper}>
          {rooms.map((room) => (
            <div
              key={room.roomid}
              className={Style.roomCard}
              onClick={() => openRoomModal(room)}
            >
              <img
                src={room.roomurl}
                alt={room.roomname}
                className={Style.roomImage}
              />
              <div className={Style.roomContent}>
                <div>{room.roomname}</div>
                <div>€{room.roomprice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalType === "room" && (
        <RoomModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={closeModal}
          onBook={openBookingModal}
        />
      )}

      {modalType === "booking" && (
        <BookingModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={closeModal} 
          userID={userID}        
        />
      )}
    </>
  );
};

export default RoomList;
