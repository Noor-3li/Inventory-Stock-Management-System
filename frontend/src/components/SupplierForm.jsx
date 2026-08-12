import { useState, useEffect } from "react";
import api from "../services/api";

export default function SupplierForm({ supplier, onSubmit }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  // When supplier prop changes, fill form fields for editing
  useEffect(() => {
    if (supplier) {
      setName(supplier.name);
      setContact(supplier.contact);
    } else {
      setName("");
      setContact("");
    }
  }, [supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (supplier) {
        // Update existing supplier
        await api.put(`/suppliers/${supplier._id}`, { name, contact });
      } else {
        // Create new supplier
        await api.post("/suppliers", { name, contact });
      }
      onSubmit();
      setName("");
      setContact("");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving supplier");
    }
  };

  return (
   <form onSubmit={handleSubmit} className="form-container">
  <input
    placeholder="Supplier Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <input
    placeholder="Contact"
    value={contact}
    onChange={(e) => setContact(e.target.value)}
    required
  />
  <button type="submit" className={supplier ? "edit-btn" : "add-btn"}>
    {supplier ? "Update" : "Add"}
  </button>
</form>
  );
}