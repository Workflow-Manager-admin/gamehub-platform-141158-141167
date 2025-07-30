import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const logoStyle = {
  color: "var(--primary-color, #1e90ff)",
  fontWeight: "bold",
  fontSize: "1.7em",
  letterSpacing: "0.02em",
  textDecoration: "none",
};

const navStyle = {
  background: "var(--bg-secondary, #f8f9fa)",
  borderBottom: "1px solid var(--border-color, #e9ecef)",
  display: "flex",
  alignItems: "center",
  height: "58px",
  padding: "0 2.5em",
  justifyContent: "space-between"
};

const linkStyle = {
  textDecoration: "none",
  color: "var(--text-primary, #23272f)",
  fontWeight: "500",
  fontSize: "1.07em",
  marginLeft: 28,
  marginRight: 0,
  transition: "color 0.15s"
};

const activeStyle = {
  color: "var(--primary-color, #1e90ff)",
};

export function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5em" }}>
        <Link to="/" style={logoStyle}>
          <span style={{ color: "#1e90ff" }}>Archid</span> Games
        </Link>
        <NavLink to="/games" style={linkStyle} activeStyle={activeStyle}>
          Games
        </NavLink>
        <NavLink to="/leaderboard" style={linkStyle} activeStyle={activeStyle}>
          Leaderboard
        </NavLink>
        {user && (
          <NavLink to="/profile" style={linkStyle} activeStyle={activeStyle}>
            Profile
          </NavLink>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.9em" }}>
        {user ? (
          <>
            <span style={{ fontSize: "0.98em", color: "#444" }}>
              Hello, <b>{user.name}</b>
            </span>
            <button
              onClick={logout}
              style={{
                background: "#fbbf24",
                color: "#23272f",
                border: "none",
                padding: "7px 16px",
                borderRadius: 8,
                fontWeight: "600",
                marginLeft: 8,
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={linkStyle} activeStyle={activeStyle}>
              Log In
            </NavLink>
            <NavLink to="/signup" style={linkStyle} activeStyle={activeStyle}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
