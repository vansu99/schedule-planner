import { IconButton, InputAdornment } from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import SnoozeIcon from "@material-ui/icons/Snooze";
import { DateTimePicker } from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import { cardActions } from "actions/Todos/card.action";
import { useDispatch } from "react-redux";

function CustomDateTimePicker({ dueDate, id }) {
  const dispatch = useDispatch();
  const [selectedDate, handleDateChange] = useState(null);

  useEffect(() => {
    handleDateChange(dueDate);
  }, [dueDate]);

  const onSubmit = data => {
    handleDateChange(data);
    dispatch(cardActions.asyncEditDetailTodoCard(id, { date: data }));
  };

  return (
    <>
      <DateTimePicker
        autoOk
        disableFuture
        hideTabs
        ampm={false}
        value={selectedDate}
        name="due_date"
        inputVariant="outlined"
        size="small"
        onChange={onSubmit}
        allowKeyboardControl={false}
        format="dd/MM/yyyy hh:mm"
        leftArrowIcon={<AlarmIcon />}
        leftArrowButtonProps={{ "aria-label": "Prev month" }}
        rightArrowButtonProps={{ "aria-label": "Next month" }}
        rightArrowIcon={<SnoozeIcon />}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disableRipple size="medium">
                <AlarmIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
}

export default CustomDateTimePicker;
