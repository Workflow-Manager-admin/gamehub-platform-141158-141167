import React from "react";
import { useTheme } from "../context/ThemeContext";

// PUBLIC_INTERFACE
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌗 Dark" : "🌞 Light"}
    </button>
  );
};

export default ThemeToggle;
