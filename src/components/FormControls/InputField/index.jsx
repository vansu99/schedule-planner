import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

function InputField({ form, name, label, disabled }) {
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          margin="dense"
          variant="outlined"
          fullWidth
          size="small"
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={errors[name]?.message}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default InputField;
