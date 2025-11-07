import { createContext, useState, useContext } from "react";
import { adminLogin, officerLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    localStorage.removeItem("user"); // clean up bad data
    return null;
  }
});


  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  async function handleAdminLogin(email, password) {
    const res = await adminLogin(email, password);
    // console.log("AdminLogin response:", res);
    setUser(res.admin);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.admin));
  }

  async function handleOfficerLogin(email, password) {
    const res = await officerLogin(email, password);
    // console.log("OfficerLogin response:", res);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, token, handleAdminLogin, handleOfficerLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
