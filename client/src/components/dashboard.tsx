import { ConnectionStatus } from "./connection-status";
import "./dashboard.css";
import { useRooms } from "./useRooms";

export const Dashboard = () => {
  const { isConnected, rooms, socket, deleteCollection, userId } = useRooms();
  return (
    <div className="root">
      <ConnectionStatus isConnected={isConnected} />
      <h1>Currently logged in as user Id: {userId}`</h1>
      <button onClick={deleteCollection}>Delete collection</button>
      <button className="add-btn" onClick={() => socket.emit("create-room")}>
        Add Room
      </button>

      <div className="card-wrapper">
        {rooms.map((r) => {
          return (
            <div key={r.roomId}>
              {r.roomId}
              <button onClick={() => socket.emit("join-room", r.roomId)}>
                Join Room
              </button>
              <button
                className="leave-btn"
                onClick={() => socket.emit("leave-room", r.roomId)}
              >
                Leave Room
              </button>
              <div className="card">
                {r.tenants.map((t) => (
                  <p key={t}>{t.slice(0, 10)}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
