import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="logo" to="/" style={{ color: "#1e90ff", fontWeight: "bold" }}>
        Archid <span style={{ color: "#23272f" }}>Games</span>
      </Link>
      <NavLink to="/games" className={({ isActive }) => isActive ? "active" : ""}>Games</NavLink>
      <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "active" : ""}>Leaderboard</NavLink>
      {user && <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink>}
      <span className="nav-actions" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.7em" }}>
        {!user && (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Log In</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Sign Up</NavLink>
          </>
        )}
        {user && (
          <>
            <span className="nav-user">
              Hello, <b>{user.name}</b>
            </span>
            <button className="btn-accent" onClick={handleLogout}>Log Out</button>
          </>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
