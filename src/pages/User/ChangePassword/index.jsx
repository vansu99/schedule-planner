import React from 'react';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SidebarUserEdit from '../UserProfileEdit/components/Sidebar';
import ChangePasswordEditForm from './components/EditForm';

const ChangePassword = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <div className={classes.editProfile}>
        <Grid container spacing={0}>
          <Grid item md={4}>
            <SidebarUserEdit />
          </Grid>
          <Grid item md={8}>
            <ChangePasswordEditForm />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ChangePassword;
