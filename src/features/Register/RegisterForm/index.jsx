import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageLogin from "../../../assets/images/login.jpg";
import "./RegisterForm.scss";

const schemaForm = yup.object().shape({
  fullname: yup.string().required("Nhập họ tên của bạn."),
  email: yup.string().email("Hãy nhập email đúng.").required("Nhập địa chỉ Email của bạn."),
  password: yup.string().min(6).max(10).required(),
  retypePassword: yup.string().oneOf([yup.ref("password"), null]),
});

function RegisterForm({ onSubmit }) {
  const { register, errors, reset, handleSubmit } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSubmitForm = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    reset();
  };

  return (
    <div className="register">
      <div className="register__content">
        <div className="register__image">
          <img src={ImageLogin} alt="register" />
        </div>

        <div className="register__forms">
          <form className="register__register" onSubmit={handleSubmit(handleSubmitForm)}>
            <h1 className="register__title">Sign Up</h1>
            <div className="register__box">
              <i className="bx bx-user register__icon"></i>
              <input type="text" placeholder="Fullname" name="fullname" className="register__input" ref={register} />
            </div>
            {Object.keys(errors).length > 0 ? <p className="register__error">{errors.fullname?.message}</p> : null}

            <div className="register__box">
              <i className="bx bx-user register__icon"></i>
              <input type="email" placeholder="Email" name="email" className="register__input" ref={register} />
            </div>
            {Object.keys(errors).length > 0 ? <p className="register__error">{errors.email?.message}</p> : null}

            <div className="register__box">
              <i className="bx bx-key register__icon"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="register__input"
                ref={register}
              />
            </div>
            {Object.keys(errors).length > 0 ? <p className="register__error">{errors.password?.message}</p> : null}

            <div className="register__box">
              <i className="bx bx-key register__icon"></i>
              <input
                type="password"
                placeholder="Password"
                name="retypePassword"
                className="register__input"
                ref={register}
              />
            </div>
            {Object.keys(errors).length > 0 ? (
              <p className="register__error">{errors.retypePassword?.message}</p>
            ) : null}

            <button type="submit" className="register__button">
              Sign Up
            </button>

            <div className="register-social">
              <ul className="register-social__list">
                <li className="register-social__item">
                  <a href="#!">
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li className="register-social__item">
                  <a href="#!">
                    <i className="bx bxl-google"></i>
                  </a>
                </li>
                <li className="register-social__item">
                  <a href="#!">
                    <i className="bx bxl-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
