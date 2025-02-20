import { useState } from "react";
import CreateUser from "./components/CreateUser.jsx";
import ReadUsers from "./components/ReadUsers.jsx";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleUserCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center mt-4">User Management App</h1>
      </header>
      <main>
        <CreateUser onUserCreated={handleUserCreated} />
        <ReadUsers refresh={refresh} />
      </main>
    </div>
  );
}

export default App;