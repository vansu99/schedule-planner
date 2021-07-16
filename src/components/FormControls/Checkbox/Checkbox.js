import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './checkbox.scss';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chkItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  chk: {
    '& + .MuiTypography-body1': {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '400',
    },
    color: theme.palette.text.primary,
  },
}));

function CheckBox({ name, option, selected, onChange, handleRemoveCheckList }) {
  const classes = useStyles();
  const removeCheckList = () => {
    if (handleRemoveCheckList) {
      handleRemoveCheckList(option.value);
    }
  };

  return (
    <div className={classes.chkItem}>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={Boolean(selected)}
            className={classes.chk}
            onChange={onChange}
            name={name}
            id={option.value}
            value={option.value}
            size="medium"
          />
        }
        label={option.text}
      />
      {handleRemoveCheckList ? (
        <IconButton onClick={removeCheckList}>
          <ClearIcon fontSize="small" color="error" />
        </IconButton>
      ) : null}
    </div>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  option: PropTypes.object,
  handleRemoveCheckList: PropTypes.func,
};

export default memo(CheckBox);
