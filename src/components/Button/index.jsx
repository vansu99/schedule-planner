import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  btn: {
    display: 'flex',
    alignItems: 'center',
    color: ({ type }) => (type === 'form' ? `#FFF` : `${theme.palette.text.primary}`),
    backgroundColor: ({ type }) => (type === 'form' ? '#3A61C8' : 'transparent'),
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    textTransform: 'none',
    fontFamily: '"Arial", sans-serif',
    fontSize: '14px',
    justifyContent: 'left',
    width: ({ type }) => (type === 'form' ? 'initial' : '100%'),
    padding: ({ type }) => (type === 'form' ? '12px 15px' : '6px 5px'),
    border: 0,
    borderRadius: ({ type }) => (type === 'form' ? '5px' : 0),
    marginBottom: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
      marginRight: theme.spacing(1),
    },
    '& > span': {
      fontWeight: ({ type }) => (type === 'form' ? 400 : 500),
    },
    '&:hover': {
      boxShadow: ({ type }) =>
        type === 'form' ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 0,
      backgroundColor: ({ type }) =>
        type === 'select' ? 'rgba(77, 84, 101, 0.04)' : 'none',
    },
  },
}));

function ButtonComponent({ text, handleClick, type, typeBtn, icon }) {
  const classes = useStyles({ type });
  return (
    <button type={typeBtn} className={classes.btn} onClick={handleClick}>
      {icon} <span>{text}</span>
    </button>
  );
}

ButtonComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  typeBtn: PropTypes.string,
  handleClick: PropTypes.func,
};

ButtonComponent.defaultProps = {
  text: 'Submit',
  typeBtn: 'button',
};

export default ButtonComponent;
