import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");

    if (token && storedUser) {
      setUserData(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setLoading(false);
    } else if (token) {
      fetch("http://localhost:3001/admins/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Autenticazione fallita");
        })
        .then((data) => {
          setIsAuthenticated(true);
          setUserData(data);
          localStorage.setItem("userData", JSON.stringify(data)); // Memorizza i dettagli dell'utente
        })
        .catch((error) => {
          console.error("Errore nel recupero dei dettagli dell'utente:", error);
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setIsAuthenticated(true);
    setUserData(user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, loading }}>
      {loading ? <p>Caricamento...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
