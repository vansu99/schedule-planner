import React from 'react';
import "./avatar.scss";

export default function Avatar({ src }) {
  return (
    <img src={src} alt="avatar" className="avatar" />
  )
}
