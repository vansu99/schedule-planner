import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordField } from 'components/FormControls';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'selectors/auth.selector';
import { ChangeAvatarButon } from 'components/ChangeAvatarButton';
import { Avatar, Box, Button, Container, Typography } from '@material-ui/core';

const schemaForm = yup.object().shape({
  email: yup.string().required('Vui lòng nhập email của bạn.'),
  password: yup.string().required('Vui lòng nhập mật khẩu.'),
});

const ChangePasswordEditForms = props => {
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUser);
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSubmitForm = values => {};

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center">
        <ChangeAvatarButon>
          <Avatar src={currentUser?.image} />
        </ChangeAvatarButon>
        <Box ml={2}>
          <Typography variant="h4" component="h4">
            {currentUser?.username}
          </Typography>
          <ChangeAvatarButon />
        </Box>
      </Box>
      <Box my={3}>
        <PasswordField form={form} label="Old Password" name="oldPassword" />
        <PasswordField form={form} label="New Password" name="newPassword" />
        <PasswordField form={form} label="Confirm Password" name="confirmPassword" />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          classes={{
            root: classes.btn,
          }}
        >
          Change Password
        </Button>
      </Box>
    </div>
  );
};

ChangePasswordEditForms.propTypes = {};

export default ChangePasswordEditForms;
