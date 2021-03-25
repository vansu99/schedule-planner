import React from "react";
import "./featureSup.scss";
import Language from "./components/Language";

export default function TopBar({ children }) {
  return (
    <div className="topbar">
      <div className="topbar__container bd-grid">
        {children}
        <Language />
      </div>
    </div>
  );
}
