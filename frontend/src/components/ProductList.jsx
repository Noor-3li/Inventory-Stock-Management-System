import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const userRole = Cookies.get("role"); // admin / manager / employee

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategoriesSuppliers = async () => {
    try {
      const catRes = await api.get("/categories");
      setCategories(catRes.data);
      const supRes = await api.get("/suppliers");
      setSuppliers(supRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesSuppliers();
  }, []);

  const deleteProduct = async (id) => {
    if (!["admin", "manager"].includes(userRole))
      return alert("Only admin or manager can delete products");
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stockIn = async (id) => {
    if (userRole !== "admin") return alert("Only admin can stock in products");
    const qty = parseInt(prompt("Enter stock quantity to add:"));
    if (qty > 0) {
      try {
        await api.put(`/products/stockin/${id}`, { quantity: qty });
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stockOut = async (id) => {
    if (userRole !== "admin") return alert("Only admin can stock out products");
    const qty = parseInt(prompt("Enter stock quantity to remove:"));
    if (qty > 0) {
      try {
        await api.put(`/products/stockout/${id}`, { quantity: qty });
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const editProduct = (product) => {
    if (!["admin", "manager"].includes(userRole))
      return alert("Only admin or manager can edit products");
    setEditingProduct(product);
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.supplier?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-content">
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />

      {/* Add / Edit form visible for Admin & Manager only */}
      {["admin", "manager"].includes(userRole) && (
        <ProductForm
          categories={categories}
          suppliers={suppliers}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          fetchProducts={fetchProducts}
        />
      )}

      <div className="list-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Quantity</th>
              {(userRole === "admin" || userRole === "manager") && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category?.name || "N/A"}</td>
                <td>{product.supplier?.name || "N/A"}</td>
                <td className={product.quantity <= product.lowStockLevel ? "low-stock" : ""}>
                  {product.quantity}
                </td>
                {(userRole === "admin" || userRole === "manager") && (
                  <td>
                    <div className="list-item-actions">
                      <button className="edit-btn" onClick={() => editProduct(product)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteProduct(product._id)}>
                        Delete
                      </button>
                      {/* Stock buttons only for Admin */}
                      {userRole === "admin" && (
                        <>
                          <button className="stock-btn" onClick={() => stockIn(product._id)}>
                            + Stock
                          </button>
                          <button className="stock-btn" onClick={() => stockOut(product._id)}>
                            - Stock
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}