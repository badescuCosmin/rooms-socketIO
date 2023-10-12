import express from "express";
import { httpGetAllRooms } from "./rooms.controller";

const roomsRouter = express.Router();

roomsRouter.get("/getRooms", httpGetAllRooms);

export default roomsRouter;
