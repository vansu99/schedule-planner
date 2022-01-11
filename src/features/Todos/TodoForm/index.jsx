import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './theme.todoForm';
import { Box, IconButton, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm, Controller } from 'react-hook-form';

TodoForm.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

TodoForm.defaultProps = {
  text: '',
  name: '',
  label: '',
  placeholder: '',
};

function TodoForm({ onCloseForm, text, submit, name, placeholder, label }) {
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    submit && submit(data);
    reset();
  };

  const closeForm = () => {
    onCloseForm && onCloseForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <Controller
        control={control}
        name={name}
        defaultValue={text}
        render={({ onChange, value, name }) => (
          <TextareaAutosize
            autoFocus
            spellCheck="false"
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className={classes.textarea}
            minRows={4}
          />
        )}
      />
      <Box display="flex" mt={1} alignItems="center">
        <Button
          disableRipple
          type="submit"
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          {label}
        </Button>
        <IconButton
          disableRipple
          onClick={closeForm}
          style={{ marginLeft: '8px' }}
        >
          <ClearIcon fontSize="default" color="error" />
        </IconButton>
      </Box>
    </form>
  );
}

export default memo(TodoForm);
