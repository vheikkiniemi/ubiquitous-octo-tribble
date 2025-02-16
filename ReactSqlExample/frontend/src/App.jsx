import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";

function App() {
  return (
    <div>
      <CreateUser />
      <ReadDeleteUsers />
      <UpdateUser />
    </div>
  );
}

export default App;