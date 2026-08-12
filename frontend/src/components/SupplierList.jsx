import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";
import SupplierForm from "./SupplierForm";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const role = Cookies.get("role"); // admin / manager / employee

  const fetchSuppliers = async () => {
    try {
      const res = await api.get("/suppliers", { withCredentials: true });
      setSuppliers(res.data);
    } catch (err) {
      console.error("Fetch suppliers error:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (role !== "admin") return alert("Only admin can delete suppliers");
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await api.delete(`/suppliers/${id}`, { withCredentials: true });
      fetchSuppliers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (supplier) => {
    if (role !== "admin") return alert("Only admin can edit suppliers");
    setEditingSupplier(supplier);
  };

  const handleFormSubmit = () => {
    setEditingSupplier(null);
    fetchSuppliers();
  };

  return (
    <div>
      <h2>Suppliers</h2>

      {/* Add / Edit form → Admin only */}
      {role === "admin" && (
        <SupplierForm supplier={editingSupplier} onSubmit={handleFormSubmit} />
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {suppliers.map((sup) => (
            <tr key={sup._id}>
              <td>{sup.name}</td>
              <td>{sup.contact}</td>
              {role === "admin" && (
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(sup)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(sup._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}