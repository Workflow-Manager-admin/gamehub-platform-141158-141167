import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./AppRouter";

// PUBLIC_INTERFACE
function App() {
  // Only light theme by default, but support toggling if needed
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
        {/* Optional: Theme toggle for demo (hidden in prod as app is light-themed) */}
        {/* <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button> */}
      </AuthProvider>
    </div>
  );
}

export default App;
