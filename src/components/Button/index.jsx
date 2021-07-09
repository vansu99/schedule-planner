import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  btn: {
    display: 'flex',
    alignItems: 'center',
    color: props => (props.type === 'form' ? '#FFF' : '#4D5465'),
    backgroundColor: props => (props.type === 'form' ? '#3A61C8' : 'transparent'),
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    textTransform: 'none',
    fontFamily: '"Arial", sans-serif',
    fontSize: '14px',
    justifyContent: 'left',
    width: props => (props.type === 'form' ? 'initial' : '100%'),
    padding: props => (props.type === 'form' ? '12px 15px' : '6px 5px'),
    border: 0,
    borderRadius: props => (props.type === 'form' ? '5px' : 0),
    marginBottom: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
      marginRight: theme.spacing(1),
    },
    '& > span': {
      fontWeight: props => (props.type === 'form' ? 400 : 500),
    },
    '&:hover': {
      boxShadow: props => (props.type === 'form' ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 0),
      backgroundColor: props => (props.type === 'select' ? 'rgba(77, 84, 101, 0.04)' : 'none'),
    },
  },
}));

function ButtonComponent({ text, handleClick, type, icon }) {
  const classes = useStyles({ type });
  return (
    <button className={classes.btn} onClick={handleClick}>
      {icon} <span>{text}</span>
    </button>
  );
}

ButtonComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ButtonComponent;
