import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { listen } from "./socket";
import { mongoConnect } from "./services/mongo";

const httpServer = http.createServer(app);

const socketServer = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

async function serverStart() {
  const PORT = 3000;
  await mongoConnect();
  httpServer.listen(PORT);
  console.log(`Listening on port ${PORT}......`);
}

serverStart();

listen(socketServer);
