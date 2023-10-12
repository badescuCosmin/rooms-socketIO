import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { createRoom, joinRoom } from "./routes/rooms.controller";
import roomsCollection from "./models/rooms.model";

export function listen(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  io.on("connection", (socket) => {
    // createRoom(socket.id);
    joinRoom(socket.id, "d-KbIR_OJ8bEmGe-AAAB");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    io.on("create-room", async () => {
      socket.join(socket.id);
      createRoom(socket.id);
      const rooms = await roomsCollection.find();
      io.emit("create-room", rooms);
    });

    io.on("join-room", async () => {
      socket.join(socket.id);
      const rooms = await roomsCollection.find();
      // io.to(msg.id).emit("join-room", [...rooms]);
    });

    io.on("leave-room", () => {
      // io.to(msg.id).emit("join-room", [...rooms]);
    });
  });
}
