import { Server } from "socket.io";
import { v4 } from "uuid";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { createRoom, joinRoom, leaveRoom } from "./routes/rooms.controller";
import roomsCollection from "./models/rooms.model";

export function listen(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  io.on("connection", async (socket) => {
    console.log("connected");
    const rooms = await roomsCollection.find();

    io.emit("ready", rooms);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("create-room", async () => {
      const room = await createRoom(v4());
      io.emit("create-room", room);
    });

    socket.on("join-room", async (roomId: string) => {
      const room = await joinRoom(socket.id, roomId);
      socket.join(roomId);
      io.to(roomId).emit("join-room", room);
    });

    socket.on("leave-room", async (roomId: string) => {
      const room = await leaveRoom(socket.id, roomId);
      io.to(roomId).emit("leave-room", room);
    });
  });
}
