import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    padding: '6px 5px',
    alignItems: 'center',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: '14px',
    width: '100%',
    justifyContent: 'left',
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    borderRadius: '4px',
    color: 'inherit',
    '& > .MuiSvgIcon-root': {
      fontSize: '20px',
      marginRight: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: 'rgba(77, 84, 101, 0.04)',
    },
  },
}));

function LinkComponent({ text, href, icon = '' }) {
  const classes = useStyles();
  return (
    <Link to={href} className={classes.link}>
      {icon} <Typography style={{ fontWeight: 400 }}>{text}</Typography>
    </Link>
  );
}

LinkComponent.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};

export default LinkComponent;
