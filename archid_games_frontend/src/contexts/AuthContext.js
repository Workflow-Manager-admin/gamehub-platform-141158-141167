import React, { createContext, useContext, useState, useEffect } from "react";
import { apiGet, apiPost } from "../api";

// PUBLIC_INTERFACE
export const AuthContext = createContext();

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("archid_auth_token") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch user with stored token
    async function checkUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await apiGet("/auth/me", token);
        setUser(data.user);
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem("archid_auth_token");
      }
      setLoading(false);
    }
    checkUser();
  }, [token]);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    const data = await apiPost("/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("archid_auth_token", data.token);
    return data.user;
  }

  // PUBLIC_INTERFACE
  async function signup(name, email, password) {
    const data = await apiPost("/auth/signup", { name, email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("archid_auth_token", data.token);
    return data.user;
  }

  // PUBLIC_INTERFACE
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("archid_auth_token");
  }

  const value = { user, token, loading, login, signup, logout, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div style={{ padding: "3em", textAlign: "center" }}>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
