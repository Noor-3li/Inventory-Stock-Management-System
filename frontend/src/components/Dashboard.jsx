import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import SupplierList from "./SupplierList";
import CategoryList from "./CategoryList";
import UserList from "./userList";

function Dashboard({ role, setRole }) {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "products":
        return <ProductList role={role} />;
      case "suppliers":
        return <SupplierList role={role} />;
      case "categories":
        return <CategoryList role={role} />;
        case "users":
  return role === "admin" ? <UserList /> : null;
      default:
        return (
          <div>
            <h2>Welcome, {role}</h2>
            <p>Inventory Management System</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setPage={setPage} role={role} setRole={setRole} />
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default Dashboard;