import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";
import CategoryForm from "./CategoryForm";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const role = Cookies.get("role"); // admin / manager / employee

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories", { withCredentials: true });
      setCategories(res.data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (role !== "admin") return alert("Only admin can delete categories");
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/categories/${id}`, { withCredentials: true });
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (category) => {
    if (role !== "admin") return alert("Only admin can edit categories");
    setEditingCategory(category);
  };

  const handleFormSubmit = () => {
    setEditingCategory(null);
    fetchCategories();
  };

  return (
    <div>
      <h2>Categories</h2>

      {/* Add / Edit form → Admin only */}
      {role === "admin" && (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleFormSubmit}
        />
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            {(role === "admin") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              {(role === "admin") && (
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(cat)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}