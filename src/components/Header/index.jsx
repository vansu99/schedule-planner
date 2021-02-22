import { pathName } from '../../configs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./header.scss";

export default function Header() {
  const [isShow, setIsShow] = useState(false);
  const loggedInUser = useSelector(state => state.user.currentUser);
  const isLoggedIn = !!loggedInUser._id; // có id là loggedIn

  const handleShowDrawler = () => {
    setIsShow(!isShow);
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
        {!isLoggedIn && (<Link to={pathName.LOGIN} className="nav__login">Login</Link>)}
        {isLoggedIn && (<div className="nav__account">
          <i className='bx bxs-user-circle'></i>
        </div>)}
      </nav>
    </header>
  )
}
