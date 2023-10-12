import Express from "express";
import roomsCollection from "../models/rooms.model";

export async function httpGetAllRooms(
  req: Express.Request,
  res: Express.Response
) {
  const data = await roomsCollection.find();
  return res.status(200).json(data);
}

export async function createRoom(sessionId: string) {
  try {
    // await roomsCollection.collection.drop();
    await roomsCollection.create({ id: sessionId, tenants: [sessionId] });
    console.log(sessionId, "session id");
  } catch (err) {
    console.log(err);
  }
}

export async function joinRoom(sessionId: string, roomId: string) {
  try {
    const findRoom = await roomsCollection.findOne({
      id: roomId,
    });
    const updatedRoom = {
      id: findRoom.id,
      tenants: [...findRoom.tenants, sessionId],
    };
    await roomsCollection.updateOne(updatedRoom);
    console.log(findRoom, "session id");
    // await roomsCollection.collection.drop();
  } catch (err) {
    console.log(err);
  }
}

export async function leaveRoom(sessionId: string, roomId: string) {
  try {
    const findRoom = await roomsCollection.findOne({
      id: roomId,
    });
    const newTenants = findRoom.tenants.filter((r) => r !== sessionId);
    const updatedRoom = {
      id: findRoom.id,
      tenants: [...newTenants],
    };
    await roomsCollection.updateOne(updatedRoom);
    console.log(findRoom, "session id");
    // await roomsCollection.collection.drop();
  } catch (err) {
    console.log(err);
  }
}
