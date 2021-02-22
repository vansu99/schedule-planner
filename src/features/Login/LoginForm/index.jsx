import React from 'react';
import "./LoginForm.scss";
import ImageLogin from '../../../assets/images/login.jpg';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schemaForm = yup.object().shape({
  email: yup.string().required("Vui lòng nhập email."),
  password: yup.string().min(6).max(10).required("Vui lòng nhập mật khẩu."),
});

export default function LoginForm({ onSubmit }) {
  const { register, reset, handleSubmit, errors } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schemaForm)
  })

  const handleSubmitForm = async (values) => {
    if(onSubmit) {
      await onSubmit(values);
    }
    reset();
  }

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__image">
          <img src={ImageLogin} alt="login"/>
        </div>

        <div className="login__forms">
          <form className="login__register" onSubmit={handleSubmit(handleSubmitForm)}>
            <h1 className="login__title">Sign In</h1>
            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input type="text" placeholder="Email" name="email" className="login__input" ref={register} />
            </div>
            {
              Object.keys(errors).length > 0 ? <p className="register__error">{errors.email?.message}</p> : null
            }

            <div className="login__box">
              <i className='bx bx-key login__icon'></i>
              <input type="password" placeholder="Password" name="password" className="login__input" ref={register} />
            </div>
            {
              Object.keys(errors).length > 0 ? <p className="register__error">{errors.password?.message}</p> : null
            }

            <a href="#!" className="login__forgot">Forgot password?</a>
            <button type="submit" className="login__button">Sign In</button>

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
