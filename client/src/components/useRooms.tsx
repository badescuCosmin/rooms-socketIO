import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export type Room = {
  roomId: string;
  tenants: string[];
};
const deleteCollection = () => {
  fetch("http://localhost:3000/api/deleteCollection");
};

const fetchRooms = () =>
  fetch("http://localhost:3000/api/getRooms")
    .then((rooms) => rooms.json())
    .then((res) => {
      console.log(res, "res");
      return res;
    });
export const useRooms = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userId, setUserId] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setUserId(socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      setUserId("");
    }

    function ready(msg: Room[]) {
      setRooms(msg);
    }

    const create = async () => {
      const activeRooms = await fetchRooms();
      setRooms(activeRooms);
    };

    async function update(room: Room) {
      const activeRooms = await fetchRooms();
      const updatedRooms = [...activeRooms].map((r) => {
        console.log(r, room);
        if (r.roomId === room.roomId) {
          console.log(room, "room to return");
          return room;
        }
        return r;
      });

      setRooms([...updatedRooms]);
    }

    socket.on("connect", onConnect);
    socket.on("ready", (msg: Room[]) => ready(msg));
    socket.on("create-room", create);
    socket.on("leave-room", update);
    socket.on("join-room", update);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ready", (msg: Room[]) => ready(msg));
      socket.off("leave-room", update);
      socket.on("join-room", update);
      socket.off("create-room", create);
    };
  }, []);

  return {
    isConnected,
    rooms,
    socket,
    deleteCollection,
    userId,
  };
};
