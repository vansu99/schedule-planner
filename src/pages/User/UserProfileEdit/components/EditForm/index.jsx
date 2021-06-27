import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { userActions } from "actions/User";
import { ChangeAvatarButon } from "components/ChangeAvatarButton";
import { InputField, SelectField, TextareField } from "components/FormControls";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";
import * as yup from "yup";
import useStyles from "./style";
import { useTranslation } from "react-i18next";

const schemaForm = yup.object().shape({
  email: yup.string(),
  username: yup.string(),
  phone: yup.string(),
  bio: yup.string()
});

function UserProfileEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const currentUser = useSelector(getCurrentUser);

  const form = useForm({
    defaultValues: {
      email: currentUser.email,
      username: currentUser.username,
      phone: currentUser.phone,
      gender: currentUser.gender,
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
            <Typography variant="h4" component="h4" className={classes.userName}>
              {currentUser?.username}
            </Typography>
          </Box>
        </Box>
        <Box my={3}>
          <InputField form={form} label="E-mail" name="email" />
          <Box my={2}>
            <InputField form={form} label={translate("full_name")} name="username" />
          </Box>
          <Box my={2}>
            <InputField form={form} label={translate("phone")} name="phone" />
          </Box>
          <Box my={3}>
            <SelectField form={form} name="gender" label={translate("gender")} />
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
          {translate("update")}
        </Button>
      </div>
    </form>
  );
}

UserProfileEdit.propTypes = {};

export default React.memo(UserProfileEdit);
