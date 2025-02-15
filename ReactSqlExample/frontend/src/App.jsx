import CreateUser from "./components/CreateUser.jsx";
import ReadUsers from "./components/ReadUsers.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import DeleteUser from "./components/DeleteUser.jsx";

function App() {
  return (
    <div>
      <CreateUser />
      <ReadUsers />
      <UpdateUser />
      <DeleteUser />
    </div>
  );
}

export default App;