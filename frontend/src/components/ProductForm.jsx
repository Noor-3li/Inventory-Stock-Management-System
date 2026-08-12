import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductForm({ categories, suppliers, editingProduct, setEditingProduct, fetchProducts }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category?._id || "");
      setSupplier(editingProduct.supplier?._id || "");
      setQuantity(editingProduct.quantity);
    } else {
      setName("");
      setCategory("");
      setSupplier("");
      setQuantity(0);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { name, category, supplier, quantity };
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
        setEditingProduct(null);
      } else {
        await api.post("/products", payload);
      }
      fetchProducts();
      setName("");
      setCategory("");
      setSupplier("");
      setQuantity(0);
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  return (
    <div className="form-container">
      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <select value={supplier} onChange={e => setSupplier(e.target.value)} required>
          <option value="">Select Supplier</option>
          {suppliers.map(sup => <option key={sup._id} value={sup._id}>{sup.name}</option>)}
        </select>
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button className="add-btn"type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );
}