import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState("light");

  const setMode = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme("light");
    }
  }, []);

  return [theme, toggleTheme];
}
