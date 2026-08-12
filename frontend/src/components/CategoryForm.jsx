import { useState, useEffect } from "react";
import api from "../services/api";

export default function CategoryForm({ category, onSubmit }) {
  const [name, setName] = useState("");

  // Fill form fields when editing
  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        // Update existing category
        await api.put(`/categories/${category._id}`, { name });
      } else {
        // Add new category
        await api.post("/categories", { name });
      }
      onSubmit();
      setName("");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" className={category ? "edit-btn" : "add-btn"}>
        {category ? "Update" : "Add"}
      </button>
    </form>
  );
}
