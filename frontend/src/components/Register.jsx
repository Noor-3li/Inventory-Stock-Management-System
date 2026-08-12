import { useState } from "react";
import api from "../services/api";

export default function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role

  const register = async () => {
    if (!name || !email || !password || !role) {
      return alert("All fields are required");
    }

    try {
      // ✅ Send credentials to backend with cookies enabled
      await api.post(
        "/auth/register",
        { name, email, password, role: role.toLowerCase() },
        { withCredentials: true } 
      );

      alert("Registered successfully. Please login.");
      goToLogin();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value.toLowerCase())} 
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>

      <button onClick={register}>Register</button>

      <p>
        Already have an account?{" "}
        <button onClick={goToLogin}>Login</button>
      </p>
    </div>
    </div>
  );
}