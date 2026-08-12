import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const [editing, setEditing] = useState(null);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users", { withCredentials: true });
    setUsers(res.data);
  };

  const submitUser = async (e) => {
    e.preventDefault();
    if (editing) {
      // Update
      await axios.put(
        `http://localhost:5000/api/users/${editing._id}`,
        { name: form.name, email: form.email, role: form.role },
        { withCredentials: true }
      );
      setEditing(null);
    } else {
      // Create
      await axios.post("http://localhost:5000/api/users", form, { withCredentials: true });
    }
    setForm({ name: "", email: "", password: "", role: "employee" });
    loadUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, { withCredentials: true });
    loadUsers();
  };

  const startEdit = (user) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="list-container">
      <h2>Users (Admin Only)</h2>

      <form className="form-container" onSubmit={submitUser}>
        <h3>{editing ? "Edit User" : "Create User"}</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {!editing && (
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        )}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>

        <button className={editing ? "edit-btn" : "add-btn"}>
          {editing ? "Update" : "Create"}
        </button>
        {editing && <button onClick={() => { setEditing(null); setForm({ name: "", email: "", password: "", role: "employee" }); }} type="button">Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="edit-btn" onClick={() => startEdit(u)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}