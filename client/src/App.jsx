import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./pages/Login";
import NewRequest from "./pages/NewRequest";
import RequestDetail from "./pages/RequestDetail";
import Signup from "./pages/Signup";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
 
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Auth routes */}
        <Route path="/signup" element={<Signup setToken={setToken} setRole={setRole} />} />
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />

        {/* Employee routes */}
        <Route
          path="/new"
          element={token ? <NewRequest /> : <Navigate to="/login" />}
        />
        <Route
          path="/requests/:id"
          element={token ? <RequestDetail /> : <Navigate to="/login" />}
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={token && role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;