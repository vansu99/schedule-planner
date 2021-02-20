import React from 'react';
import "./LoginForm.scss";
import ImageLogin from '../../assets/images/login.jpg';

export default function LoginForm() {
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__image">
          <img src={ImageLogin} alt="login"/>
        </div>

        <div className="login__forms">
          <form className="login__register">
            <h1 className="login__title">Sign In</h1>
            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input type="text" placeholder="Username" className="login__input" />
            </div>

            <div className="login__box">
              <i className='bx bx-key login__icon'></i>
              <input type="password" placeholder="Password" className="login__input" />
            </div>

            <a href="#!" className="login__forgot">Forgot password?</a>
            <a href="#!" className="login__button">Sign In</a>

            <div>
              <span className="login__account">Dont't have an Account?</span>
               <span className="login__signup">Sign Up</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
