import express from "express";
import { httpDeleteDbCollection, httpGetAllRooms } from "./rooms.controller";

const roomsRouter = express.Router();

// return just empty rooms,

roomsRouter.get("/getRooms", httpGetAllRooms);

roomsRouter.get("/deleteCollection", httpDeleteDbCollection);

export default roomsRouter;
