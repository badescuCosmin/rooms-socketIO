export const ConnectionStatus = ({ isConnected }: { isConnected: boolean }) => {
  return <h1>Client is {isConnected ? "connected" : "disconnected"}</h1>;
};
