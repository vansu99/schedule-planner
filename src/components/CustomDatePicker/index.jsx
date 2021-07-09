import { IconButton, InputAdornment } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import SnoozeIcon from '@material-ui/icons/Snooze';
import { DateTimePicker } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import useStyles from './CustomDatePicker.style';

function CustomDateTimePicker({ dueDate, onSubmit }) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(null);

  useEffect(() => {
    handleDateChange(dueDate);
  }, [dueDate]);

  const handleSubmit = data => {
    handleDateChange(data);
    onSubmit(data);
  };

  return (
    <>
      <DateTimePicker
        autoOk
        hideTabs
        ampm={false}
        value={selectedDate}
        name="due_date"
        inputVariant="outlined"
        size="small"
        className={classes.customDate}
        onChange={handleSubmit}
        allowKeyboardControl={false}
        format="dd/MM/yyyy hh:mm"
        leftArrowIcon={<AlarmIcon />}
        leftArrowButtonProps={{ 'aria-label': 'Prev month' }}
        rightArrowButtonProps={{ 'aria-label': 'Next month' }}
        rightArrowIcon={<SnoozeIcon />}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disableRipple size="medium">
                <AlarmIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default CustomDateTimePicker;
