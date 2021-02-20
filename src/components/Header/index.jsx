import React, { useState } from 'react';
import "./header.scss";

export default function Header() {
  const [isShow, setIsShow] = useState(false);

  const handleShowDrawler = () => {
    setIsShow(!isShow)
  }

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div className="nav__toggle" onClick={handleShowDrawler}>
          <i className='bx bxs-grid'></i>
        </div>
        <a href="#!" className="nav__logo">Scheduler</a>
        <div className={isShow ? "nav__menu show" : "nav__menu"}>
          <ul className="nav__list">
            <li className="nav__item active">
              <a href="#home" className="nav__link">Home</a>
            </li>
            <li className="nav__item">
              <a href="#home" className="nav__link">Contact</a>
            </li>
            <li className="nav__item">
              <a href="#home" className="nav__link">About</a>
            </li>
            <li className="nav__item">
              <span className="divider"></span>
            </li>
          </ul>
        </div>
        <a href="#!" className="nav__login">Login</a>
      </nav>
    </header>
  )
}
