import { useEffect, useState } from "react";
import Style from "../styles/roomCard.module.scss";

const RoomList = ({ fetchUrl }) => {
  const [rooms, setRooms] = useState([]);

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

  return (
    <>
      <div className={Style.lastestRoomContainer}>
        <div className={Style.latestRoomTitle}>Latest Rooms</div>
        <div className={Style.latestRoomWrapper}>
          {rooms.map((room) => (
            <div key={room.roomid} className={Style.roomCard}>
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
    </>
  );
};

export default RoomList;
