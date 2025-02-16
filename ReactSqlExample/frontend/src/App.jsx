import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <CreateUser onUserAdded={() => setRefresh(prev => prev + 1)} />
      <ReadDeleteUsers refresh={refresh} />
      <UpdateUser />
    </div>
  );
}

export default App;