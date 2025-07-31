import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  const { user } = useAuth();

  return (
    <div className="App" data-theme="">
      <Navbar />
      <ThemeToggle />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<HomePage />} />
          <Route path="/games/:id" element={<GameDetailsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="footer" style={{textAlign:"center", padding:"2em", color:"#7b7e90", fontSize:"0.9em"}}>
        &copy; {new Date().getFullYear()} Archid Games. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
