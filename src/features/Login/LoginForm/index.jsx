import React from "react";
import useStyles from "./theme.loginForm";
import ImageLogin from "assets/images/bg-1.png";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { InputField, PasswordField } from "components/FormControls";
import { Box, Button, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

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
            {/* <Box className={classes.orLogin}>
              <Box component="span">{translate("or")}</Box>
            </Box> */}
            <Divider variant="middle" style={{ margin: "2rem 0" }}/>
            <Link to="/facebook" className={classes.socialLogin}>
              <i className="bx bxl-facebook-square"></i>
              {translate("login_fb")}
            </Link>
            <Link to="/" className={classes.forgotLogin}>
              {translate("forgot_pw")}
            </Link>
          </form>
        </Box>
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
