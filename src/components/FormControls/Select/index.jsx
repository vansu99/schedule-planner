import Select from '@material-ui/core/Select';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 90,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectField({ form, name, label }) {
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => {
        return (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              margin="dense"
              variant="outlined"
              size="small"
              label={label}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        );
      }}
    />
  );
}

SelectField.propTypes = {};

export default SelectField;
