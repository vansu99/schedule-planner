import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ImageLogin from "assets/images/bg-1.png";
import { InputField, PasswordField } from "components/FormControls";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";
import GoogleLogin from "react-google-login";
import useStyles from "./theme.loginForm";

const schemaForm = yup.object().shape({
  email: yup.string().required("Vui lòng nhập email của bạn."),
  password: yup.string().required("Vui lòng nhập mật khẩu.")
});

export default function LoginForm({ onSubmit }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const form = useForm({
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
    form.reset();
  };

  const { isSubmitting } = form.formState;

  const response = async data => {
    const { accessToken, profileObj } = data;
    const formLoginData = {
      username: profileObj?.givenName,
      email: profileObj?.email,
      image: profileObj?.imageUrl,
      type: "google"
    };
    if (onSubmit) {
      await onSubmit(formLoginData);
    }
  };

  const redirectToGoogle = async () => {
    const googleLoginURL = "http://localhost:8080/api/auth/google";
    const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");
  };

  return (
    <div className={classes.root}>
      <div className={classes.loginLeft}>
        <img src={ImageLogin} alt="" width={540} />
      </div>
      <div className={classes.loginRight}>
        <Box className={classes.loginForm}>
          <Typography component="h2" variant="h2" className={classes.title}>
            Schedule Planner
          </Typography>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <InputField form={form} label="Email" name="email" />
            <PasswordField form={form} label="Password" name="password" />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              classes={{
                root: classes.btnLogin
              }}
            >
              {translate("login")}
            </Button>
            <Divider variant="middle" style={{ margin: "2rem 0" }} />
            <Link to="/" className={classes.forgotLogin}>
              {translate("forgot_pw")}
            </Link>
          </form>
        </Box>
        <div className={classes.socialLogin} onClick={redirectToGoogle}>
          <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" />
          <span>{translate("login_gg")}</span>
          {/* <GoogleLogin
            clientId="500873698006-03npif0gtel797a3bipfvfle38klnocu.apps.googleusercontent.com"
            onSuccess={response}
            onFailure={response}
          /> */}
        </div>
        <Box className={classes.otherRegister}>
          <Typography variant="h6" component="p">
            {translate("dont_acc")}
            <Link to="/register">{translate("register")}</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
