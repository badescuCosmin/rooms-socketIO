import { Dashboard } from "./components/dashboard";
import { RoomsContextProvider } from "./context/roomsContext";

function App() {
  return (
    <RoomsContextProvider>
      <Dashboard />
    </RoomsContextProvider>
  );
}

export default App;
