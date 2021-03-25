import React from "react";
import "./LoginForm.scss";
import ImageLogin from "assets/images/login.jpg";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const schemaForm = yup.object().shape({
  email: yup.string().required("Vui lòng nhập email."),
  password: yup.string().min(6).max(10).required("Vui lòng nhập mật khẩu.")
});

export default function LoginForm({ onSubmit }) {
  const { t: translate } = useTranslation();
  const { register, reset, handleSubmit, errors } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(schemaForm)
  });

  const handleSubmitForm = async values => {
    if (onSubmit) {
      await onSubmit(values);
    }
    reset();
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__image">
          <img src={ImageLogin} alt="login" />
        </div>

        <div className="login__forms">
          <form className="login__register" onSubmit={handleSubmit(handleSubmitForm)}>
            <h1 className="login__title">Scheduler</h1>
            <div className="login__content">
              <div className="login__box">
                <input type="text" placeholder="Email" name="email" className="login__input" ref={register} />
              </div>
              {Object.keys(errors).length > 0 ? <p className="register__error">{errors.email?.message}</p> : null}

              <div className="login__box">
                <input type="password" placeholder="Password" name="password" className="login__input" ref={register} />
              </div>
              {Object.keys(errors).length > 0 ? <p className="register__error">{errors.password?.message}</p> : null}

              <div className="login__box mt-1">
                <button type="submit" className="login__button">
                  {translate("login")}
                </button>
              </div>

              <div className="login__or">
                <span>{translate("or")}</span>
              </div>

              <div className="login__social">
                <button className="login__social-btn">
                  <i className="bx bxl-facebook-square login__icon"></i>
                  <span>{translate("login_fb")}</span>
                </button>
              </div>
            </div>

            <a href="#!" className="login__forgot">
            {translate("forgot_pw")}
            </a>
          </form>
          <div className="login__other">
            <p>
              {translate("dont_acc")}
              <a href="#!">{translate("register")}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
