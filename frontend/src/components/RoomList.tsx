import { useEffect, useState } from "react";
import Style from "../styles/roomCard.module.scss";
import RoomModal from "./RoomModal";
import BookingModal from "./BookingModal";
import { Room } from "../util/types";

const RoomList = ({ fetchUrl }: any) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("room");

  //Gets all the rooms
  const fetchRooms = async () => {
    try {
      const response = await fetch(fetchUrl);
      const data: Room[] = await response.json();
      setRooms(data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchUrl]);

  // Opens the room modal for editing/viewing
  const openRoomModal = (room: Room) => {
    setSelectedRoom(room);
    setModalType("room");
    setIsModalOpen(true);
  };

  // Opens the booking modal
  const openBookingModal = () => {
    setModalType("booking");
  };

  // Closes any open modal
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
          refreshRooms={fetchRooms}
        />
      )}

      {modalType === "booking" && (
        <BookingModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default RoomList;
