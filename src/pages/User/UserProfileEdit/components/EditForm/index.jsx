import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useStyles from "./style";
import * as yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField, TextareField } from "components/FormControls";
import { checkImage } from "helpers";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "actions/User";
import { getCurrentUser } from "selectors/auth.selector";
import { ChangeAvatarButon } from "components/ChangeAvatarButton";
import { Avatar, Box, Button, Container, Typography } from "@material-ui/core";

const schemaForm = yup.object().shape({
  email: yup.string(),
  username: yup.string(),
  bio: yup.string()
});

function UserProfileEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const form = useForm({
    defaultValues: {
      email: currentUser.email,
      username: currentUser.username,
      bio: currentUser.bio || ""
    },
    resolver: yupResolver(schemaForm)
  });
  const { isSubmitting } = form.formState;

  useEffect(() => {
    document.title = "Edit Profile • Schedule Planner";
  }, []);

  const handleSubmit = values => {
    dispatch(userActions.asyncUpdateUserProfile(currentUser._id, values));
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className={classes.formEdit}>
        <Box display="flex" alignItems="center">
          <ChangeAvatarButon>
            <Avatar src={currentUser?.image} className={classes.avatarSize} />
          </ChangeAvatarButon>
          <Box ml={2}>
            <Typography variant="h4" component="h4">
              {currentUser?.username}
            </Typography>
          </Box>
        </Box>
        <Box my={3}>
          <InputField form={form} label="Email" name="email" />
          <Box my={2}>
            <InputField form={form} label="Tên của bạn" name="username" />
          </Box>
          <TextareField form={form} label="Tiểu sử" name="bio" />
        </Box>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          classes={{
            root: classes.btn
          }}
        >
          Cập nhật
        </Button>
      </div>
    </form>
  );
}

UserProfileEdit.propTypes = {};

export default React.memo(UserProfileEdit);
