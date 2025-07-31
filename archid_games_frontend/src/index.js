import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GamesProvider } from "./context/GamesContext";
import { LeaderboardProvider } from "./context/LeaderboardContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <AuthProvider>
      <GamesProvider>
        <LeaderboardProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LeaderboardProvider>
      </GamesProvider>
    </AuthProvider>
  </ThemeProvider>
);
