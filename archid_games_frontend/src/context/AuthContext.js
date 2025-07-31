import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage, setUserToStorage, clearUserFromStorage } from "../utils/storage";

// Context for user/authentication/session state
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUserFromStorage());
  const [token, setToken] = useState(() => localStorage.getItem("archid_auth_token") || "");

  // Simulate token and persistence (mock)
  useEffect(() => {
    if (user) {
      setUserToStorage(user);
      localStorage.setItem("archid_auth_token", token || "mocktoken_" + (user.email || user.name));
    } else {
      clearUserFromStorage();
      localStorage.removeItem("archid_auth_token");
    }
  }, [user, token]);

  const login = (email, password) => {
    // Simulate login (search mock users DB)
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem("archid_mock_users") || "[]");
      const found = users.find(u => u.email === email && u.password === password);
      setTimeout(() => {
        if (found) {
          setUser({ name: found.name, email: found.email, achievements: found.achievements || [], scores: found.scores || [] });
          setToken("mocktoken_" + email);
          resolve(found);
        } else {
          reject(new Error("Invalid credentials."));
        }
      }, 600);
    });
  };

  const signup = (name, email, password) => {
    // Simulate registration with mock DB in localStorage
    return new Promise((resolve, reject) => {
      let users = JSON.parse(localStorage.getItem("archid_mock_users") || "[]");
      if (users.find(u => u.email === email)) {
        return reject(new Error("Email already registered"));
      }
      const newUser = { name, email, password, achievements: [], scores: [] };
      users.push(newUser);
      localStorage.setItem("archid_mock_users", JSON.stringify(users));
      setUser({ name, email, achievements: [], scores: [] });
      setToken("mocktoken_" + email);
      resolve(newUser);
    });
  };

  const loginAsGuest = () => {
    setUser({ name: "Guest", email: "", isGuest: true, achievements: [], scores: [] });
    setToken("");
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  const updateUser = (userData) => {
    setUser(prev => ({...prev, ...userData}));
    // Update saved users as well
    let users = JSON.parse(localStorage.getItem("archid_mock_users") || "[]");
    if (prev && prev.email) {
      users = users.map(u => u.email === prev.email ? {...u, ...userData} : u);
      localStorage.setItem("archid_mock_users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{
      user, token, login, signup, logout, loginAsGuest, updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming Auth context
export function useAuth() {
  return useContext(AuthContext);
}
