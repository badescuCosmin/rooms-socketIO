import Express from "express";
import roomsCollection from "../models/rooms.model";

export async function httpGetAllRooms(
  req: Express.Request,
  res: Express.Response
) {
  const data = await roomsCollection.find();
  return res.status(200).json(data);
}

export async function httpDeleteDbCollection(
  req: Express.Request,
  res: Express.Response
) {
  await roomsCollection.collection.drop();
  return res.status(200).json("db-collection-updated");
}

export async function createRoom(sessionId: string) {
  try {
    return await roomsCollection.create({
      roomId: sessionId,
      tenants: [],
    });
  } catch (err) {
    console.log(err);
  }
}

export async function joinRoom(sessionId: string, roomId: string) {
  try {
    const findRoom = await roomsCollection.findOne({
      roomId: roomId,
    });

    if (findRoom) {
      const updatedRoom = {
        roomId: findRoom.roomId,
        tenants: [...findRoom.tenants, sessionId],
      };

      await roomsCollection.findByIdAndUpdate(
        { _id: findRoom._id },
        updatedRoom,
        { upsert: true }
      );
      return updatedRoom;
      // await roomsCollection.collection.drop();
    }
  } catch (err) {
    console.log(err);
  }
}

export async function leaveRoom(sessionId: string, roomId: string) {
  try {
    const findRoom = await roomsCollection.findOne({
      roomId,
    });

    if (findRoom) {
      const newTenants = findRoom.tenants.filter((r) => r !== sessionId);
      const updatedRoom = {
        roomId: findRoom.roomId,
        tenants: [...newTenants],
      };
      await roomsCollection.findByIdAndUpdate(
        { _id: findRoom._id },
        updatedRoom,
        { upsert: true }
      );
      return updatedRoom;
    }
  } catch (err) {
    console.log(err);
  }
}
