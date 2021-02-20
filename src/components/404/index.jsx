import React from 'react';
import Image404 from '../../assets/images/404err.png';
import "./404.scss";

export default function NotFound() {
  return (
    <div className="notfound">
      <img src={Image404} alt="notfound" className="notfound__image" />
    </div>
  )
}
