import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
  roomId: {
    type: String,
    require: true,
  },
  tenants: {
    type: [String],
    require: true,
  },
});

export default mongoose.model("Rooms", roomsSchema);
