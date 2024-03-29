import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(props => ({
  formControl: {
    position: 'relative',
    marginRight: '0.6rem',
    display: 'flex',
    alignItems: 'center',
  },
  customRadio: {
    width: '3rem',
    height: '3rem',
    textAlign: 'center',
    lineHeight: '3rem',
    borderRadius: '4px',
    display: 'inline-block',
  },
  customInput: {
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    '&:checked + label': {
      position: 'relative',
      '&::before, &::after': {
        content: "''",
        position: 'absolute',
        backgroundColor: 'white',
        height: '3px',
        transformOrigin: 'left'
      },
      '&::before': {
        width: '10px',
        top: '12px',
        left: '8px',
        transform: 'rotate(45deg)'
      },
      '&::after': {
        width: '15px',
        top: '18px',
        left: '14px',
        transform: 'rotate(-45deg)'
      }
    },
  },
}));

function StyledRadio({ name, value, checked, setColorBoard }) {
  const classes = useStyles();
  const radio = useRef(null);

  const handleChange = event => {
    const checked = event.currentTarget.value;
    setColorBoard(checked);
  };

  return (
    <div className={classes.formControl}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        defaultChecked={checked === value}
        ref={radio}
        onChange={handleChange}
        className={classes.customInput}
      />
      <label className={classes.customRadio} style={{ backgroundColor: `${value}` }}></label>
    </div>
  );
}

StyledRadio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
};

export default StyledRadio;
