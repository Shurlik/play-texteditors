"use client";
import { useEffect, useState, FC } from "react";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useState<string>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, isMounted]);

  if (!isMounted) return null;

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
        color: theme === "dark" ? "#f0f0f0" : "#333",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: theme === "dark" ? "#555" : "#e0e0e0",
        },
        mr: "15px",
      }}
    >
      {theme === "dark" ? (
        <LightModeIcon
          sx={{
            fontSize: "1.5rem",
            transition: "transform 0.3s ease",
            transform: "rotate(360deg)",
          }}
        />
      ) : (
        <DarkModeIcon
          sx={{
            fontSize: "1.5rem",
            transition: "transform 0.3s ease",
            transform: "rotate(-360deg)",
          }}
        />
      )}
    </IconButton>
  );
};

export default ThemeSwitcher;