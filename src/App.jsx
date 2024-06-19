import { FaArchive } from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <>
      <div className="App container mx-auto mt-3 font-thin">
        <h1 className="text-5xl">
          <FaArchive className="inline-block text-red-400 align-top" />
          Your Appointments
        </h1>
      </div>
    </>
  );
}

export default App;
