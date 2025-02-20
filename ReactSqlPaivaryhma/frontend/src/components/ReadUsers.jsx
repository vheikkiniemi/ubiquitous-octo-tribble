import { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Alert } from "react-bootstrap";

export default function ReadUsers({ refresh }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  return (
    <div className="container mt-4">
      <h2>Users List</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.id}>
            {user.name} ({user.email})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}