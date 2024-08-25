import React from "react";
import "../style/App.css";
import "../style/all.css";
import { useState, useEffect } from "react";
function Header() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "light";
  });
  useEffect(() => {
    localStorage.setItem("mode", mode);
    document.body.classList.remove(mode === "light" ? "dark" : "light");
    document.body.classList.add(mode === "light" ? "light" : "dark");
  }, [mode]);
  return (
    <header>
      <h1>Where in the world?</h1>
      <div
        onClick={() => {
          setMode(mode === "light" ? "dark" : "light");
        }}
        className="dark"
      >
        <i className="fa fa-moon"></i> Dark Mode
      </div>
    </header>
  );
}

export default Header;
