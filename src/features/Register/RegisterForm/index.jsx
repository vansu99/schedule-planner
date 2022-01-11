import React from 'react';
import useStyles from './theme.registerForm';
import ImageRegister from 'assets/images/bg-3.jpg';
import Logo from 'assets/images/logo.png';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  InputField,
  PasswordField,
  SelectField,
} from 'components/FormControls';
import { Box, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LoginGoogle from 'features/Login/LoginSocial/loginGoogle';

const schemaForm = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên của bạn.'),
  email: yup.string().required('Vui lòng nhập email của bạn.'),
  password: yup.string().required('Vui lòng nhập mật khẩu.'),
});

export default function RegisterForm({ onSubmit }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSubmitForm = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      <div className={classes.loginLeft}>
        <img src={ImageRegister} alt="" width={540} />
      </div>
      <div className={classes.loginRight}>
        <Box className={classes.loginForm}>
          <div className="login-brand">
            <img src={Logo} alt="logo" />
            <Typography component="h2" variant="h2" className={classes.title}>
              Schedule Planner
            </Typography>
          </div>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <InputField form={form} label="Email" name="email" />
            <InputField form={form} label="Tên người dùng" name="username" />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width="calc(65% - 1rem)">
                <InputField form={form} label="Số điện thoại" name="phone" />
              </Box>
              <Box mt="5px">
                <SelectField form={form} label="Gender" name="gender" />
              </Box>
            </Box>
            <PasswordField form={form} label="Password" name="password" />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              classes={{
                root: classes.btnLogin,
              }}
            >
              {translate('register')}
            </Button>
            <Divider variant="middle" style={{ margin: '2rem 0' }} />
            <Typography
              variant="caption"
              component="p"
              className={classes.term}
            >
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <strong>Điều khoản, Chính sách dữ liệu</strong> và{' '}
              <strong>Chính sách cookie</strong> của chúng tôi.
            </Typography>
          </form>
        </Box>
        <div className={classes.socialLogin}>
          <LoginGoogle />
        </div>
        <Box className={classes.otherRegister}>
          <Typography variant="h6" component="p">
            {translate('dont_acc')}
            <Link to="/login">{translate('login')}</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
