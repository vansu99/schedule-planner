import React from 'react';
import './avatar.scss';

export default function Avatar({ src }) {
  return (
    <div className="avatar">
      <img
        src={
          src ||
          `https://www.événementiel.net/wp-content/uploads/2014/02/default-placeholder.png`
        }
        alt="avatar"
      />
    </div>
  );
}
