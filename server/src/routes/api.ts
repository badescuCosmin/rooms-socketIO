import express from "express";
import roomsRouter from "./rooms.router";
const api = express();

api.use("/api", roomsRouter);

export default api;
