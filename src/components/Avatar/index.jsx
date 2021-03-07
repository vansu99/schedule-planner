import React from "react";
import "./avatar.scss";

export default function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src} alt="avatar" />
    </div>
  );
}
