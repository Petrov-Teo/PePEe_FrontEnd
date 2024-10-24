import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
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
        })
        .catch((error) => {
          console.error("Errore nel recupero dei dettagli dell'utente:", error);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
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

  return <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
