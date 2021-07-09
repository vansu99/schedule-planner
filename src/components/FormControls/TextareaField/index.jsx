import { TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: '4px',
    borderColor: '#d0c7c7',
    '&:focus': {
      borderColor: '#0348FF',
    },
  },
}));

function TextareaField({ form, name, label }) {
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <TextareaAutosize
          autoFocus
          className={classes.root}
          placeholder={label}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          rowsMin={3}
        />
      )}
    />
  );
}

TextareaField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextareaField;
