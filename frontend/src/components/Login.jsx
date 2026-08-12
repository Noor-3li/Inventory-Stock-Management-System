import { useState } from "react";
import api from "../services/api";

export default function Login({ setRole, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) return alert("All fields are required");

    try {
      // ✅ Send credentials with cookies enabled
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // Set user role in frontend state for UI control
      setRole(res.data.user.role.toLowerCase());
      alert("Login successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Login</h2>

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

      <button onClick={login}>Login</button>

      <p className="register-text">
        Don’t have an account?{" "}
        <br></br>
        <span onClick={goToRegister}>Register</span>
      </p>
    </div>
    </div>
  );
}