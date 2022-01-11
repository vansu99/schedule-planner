import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import EditForm from './components/EditForm';
import SidebarUserEdit from './components/Sidebar';
import useStyles from './style';

const UserProfileEdit = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.editProfileWrapper}>
      <div className={classes.editProfile}>
        <Grid container spacing={0}>
          <Grid item md={4}>
            <SidebarUserEdit />
          </Grid>
          <Grid item md={8}>
            <EditForm />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

UserProfileEdit.propTypes = {};

export default UserProfileEdit;
