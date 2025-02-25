import { useEffect, useState } from "react";
import Style from "../styles/roomCard.module.scss";
import RoomModal from "./RoomModal";

const RoomList = ({ fetchUrl }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms", err);
      }
    };
    fetchRooms();
  }, [fetchUrl]);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
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
              onClick={() => openModal(room)}
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

      {/* Modal Component */}
      <RoomModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default RoomList;
