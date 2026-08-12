import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [role, setRole] = useState(Cookies.get("role") || null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (role) Cookies.set("role", role);
    else Cookies.remove("role");
  }, [role]);

  if (!role) {
    return showRegister ? (
      <Register goToLogin={() => setShowRegister(false)} />
    ) : (
      <Login setRole={setRole} goToRegister={() => setShowRegister(true)} />
    );
  }

  return <Dashboard role={role} setRole={setRole} />;
}

export default App;