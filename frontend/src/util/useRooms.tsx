import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../util/useUser";
import { Room } from "../util/types";

function useRooms(room: Room | null, refreshRooms?: () => void) {
  const { isAdmin } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [roomname, setRoomname] = useState(room?.roomname || "");
  const [roomdescription, setRoomdescription] = useState(
    room?.roomdescription || ""
  );
  const [roomprice, setRoomprice] = useState(room?.roomprice || 0);

  useEffect(() => {
    if (room) {
      setRoomname(room.roomname);
      setRoomdescription(room.roomdescription);
      setRoomprice(room.roomprice);
    }
  }, [room]);

  const updateRoom = async () => {
    if (!room || !room.roomid) {
      console.error("Error: roomid is missing or undefined!");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/rooms/update/${room.roomid}`,
        {
          roomname,
          roomdescription,
          roomprice,
        }
      );

      setIsEditing(false);
      refreshRooms?.();
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Failed to update room.");
    }
  };

  const deleteRoom = async (roomid: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/rooms/delete/${roomid}`
      );
      refreshRooms?.();
    } catch (err) {
      console.error("Problem deleting room", err);
    }
  };

  return {
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
  };
}

export default useRooms;
