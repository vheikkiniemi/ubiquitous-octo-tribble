import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Section from "./components/Section.jsx";
import ContactForm from "./components/ContactForm.jsx";
import UserForm from "./components/UserForm.jsx";
import UserList from "./components/UserList.jsx";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3000";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Funktio, joka hakee käyttäjät API:sta ja päivittää tilan
  const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    setUsers(data);
  };

  // Hakee käyttäjät heti kun komponentti renderöityy
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <Header />
      <main>
        <UserForm user={editingUser} onSave={fetchUsers} />
        <UserList users={users} onEdit={setEditingUser} onDelete={fetchUsers} />
      </main>
      <Footer />
    </div>
  )
}

export default App
