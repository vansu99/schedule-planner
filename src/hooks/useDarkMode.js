import { useState, useEffect } from "react";
import { StorageKeys } from "configs";

export default function useDarkMode() {
  const [mode, setMode] = useState(() => localStorage.getItem(StorageKeys.DARK_MODE));

  useEffect(() => {
    window.addEventListener("storage", setPreferedTheme);
    return () => {
      window.removeEventListener("storage", setPreferedTheme);
    };
  }, []);

  const setPreferedTheme = () => {
    const _mode = localStorage.getItem(StorageKeys.DARK_MODE);
    if (_mode) {
      setMode(_mode);
    } else {
      setMode("light");
    }
  };

  const toggleTheme = () => {
    setMode(mode => (mode === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem(StorageKeys.DARK_MODE, "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem(StorageKeys.DARK_MODE, "light");
    }
  }, [mode]);

  return (
    <div className="toggle-themes" onClick={toggleTheme}>
      {mode === "dark" ? <i className="bx bx-moon toggle-icon"></i> : <i className="bx bx-sun toggle-icon"></i>}
    </div>
  );
}
