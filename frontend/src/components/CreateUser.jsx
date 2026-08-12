import axios from "axios";
import { useState } from "react";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/users",
      form,
      { withCredentials: true }
    );

    alert("User created");
  };

  return (
    <form className="form-container" onSubmit={submit}>
      <h2>Create User (Admin)</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>

      <button className="add-btn">Create</button>
    </form>
  );
}