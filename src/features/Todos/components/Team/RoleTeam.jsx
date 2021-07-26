import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  roleWrapper: {
    position: 'absolute',
    width: '35rem',
    padding: '1.2rem 1.5rem',
    top: '4rem',
    left: 0,
    borderRadius: '5px',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.text.border}`,
  },
  roleTop: {
    paddingBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid currentColor',
    '& .icon': {
      fontSize: '2rem',
      cursor: 'pointer',
    },
  },
  roleList: {
    paddingTop: '1.2rem',
  },
  roleItem: {
    '&:not(:last-child)': {
      marginBottom: '1rem',
    },
    '& .role-desc': {
      lineHeight: 1.2,
      fontFamily: '"Roboto", sans-serif',
    },
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.25)',
    },
  },
}));

const RoleTeam = ({ role, onClose, onChangeRole }) => {
  const classes = useStyles();

  const handleChangeRole = data => {
    onChangeRole && onChangeRole(data);
  };

  return (
    <div className={classes.roleWrapper}>
      <div className={classes.roleTop}>
        <span></span>
        <h3 className="role-title">Change Permissions</h3>
        <span onClick={onClose} className="icon">
          <i className="bx bx-x"></i>
        </span>
      </div>
      <div className={classes.roleList}>
        <div className={classes.roleItem} onClick={() => handleChangeRole({ type: 'admin' })}>
          <h4 className="role-name">
            Admin
            {role?.type === 'admin' && (
              <i className="bx bx-check" style={{ fontSize: '1.7rem', marginLeft: '5px', fontWeight: 600 }}></i>
            )}
          </h4>
          <p className="role-desc">Can view and edit cards, remove members, and change all settings for the project.</p>
        </div>
        <div className={classes.roleItem} onClick={() => handleChangeRole({ type: 'member' })}>
          <h4 className="role-name">
            Member{' '}
            {role?.type === 'member' && (
              <i className="bx bx-check" style={{ fontSize: '1.7rem', marginLeft: '5px', fontWeight: 600 }}></i>
            )}
          </h4>
          <p className="role-desc">Can view and edit cards. Can't change settings.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleTeam;
