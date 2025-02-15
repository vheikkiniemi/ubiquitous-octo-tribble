import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3000";

const UserList = ({ users, onEdit, onDelete }) => {
    const handleDelete = async (id) => {
        await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
        onDelete();
    };

    return (
        <div className="mt-4">
            <h2 className="mb-3">Käyttäjälista</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nimi</th>
                        <th>Sähköposti</th>
                        <th>Toiminnot</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="d-flex gap-2">
                                    <button
                                        className="btn btn-secondary btn-sm w-100" 
                                        onClick={() => onEdit(user)}
                                    >
                                        Muokkaa
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm w-100"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Poista
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Ei käyttäjiä.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
