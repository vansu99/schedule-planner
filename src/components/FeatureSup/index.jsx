import React from "react";
import "./featureSup.scss";

export default function FeatureSup({ children }) {
  return (
    <div className="featureSup">
      <div className="featureSup__container bd-grid">
        {children}
        <div className="featureSup__item">
          <span>VN</span>
        </div>
      </div>
    </div>
  );
}
