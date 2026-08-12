import React from "react";
import api from "../services/api";

export default function Sidebar({ setPage, role, setRole }) {
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // backend logout
      setRole(null); // redirect to login
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      setRole(null);
    }
  };

  return (
    <div className="sidebar">
      <h2>Inventory System</h2>
      <ul>
        <li onClick={() => setPage("dashboard")}>Dashboard</li>
        {/* Products visible to all roles */}
        <li onClick={() => setPage("products")}>Products</li>

        {/* Categories & Suppliers viewable by all */}
        <li onClick={() => setPage("categories")}>Categories</li>
        <li onClick={() => setPage("suppliers")}>Suppliers</li>

        {/* Future Admin-only pages (like Users) */}
        {role === "admin" && <li onClick={() => setPage("users")}>Users</li>}

        <li onClick={handleLogout}>Logout</li>
      </ul>
      <p>Role: {role}</p>
    </div>
  );
}