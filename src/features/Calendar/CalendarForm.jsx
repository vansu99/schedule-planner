import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "350px",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: "#FFF",
    borderRadius: "4px"
  },
  title: {
    paddingBottom: theme.spacing(1.5)
  },
  datePicker: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1),
    borderRadius: "4px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    outline: "none"
  }
}));

function CalendarForm({ onSubmit, event = {} }) {
  const classes = useStyles();
  const [content, setContent] = useState({});

  useEffect(() => {
    if (event) {
      setContent({ ...event });
    }
  }, [event]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(content);
    }
  };

  const onChange = e => {
    setContent({
      ...content,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Event</Typography>
      <Divider />
      <Box mt={2}>
        <TextField value={content?.title} onChange={onChange} name="title" size="small" fullWidth variant="outlined" />
        <DatePicker
          className={classes.datePicker}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd/MM/yy HH:mm"
          timeFormat="HH:mm"
          name="date"
          closeOnScroll={true}
          autoComplete="off"
          selected={content && content?.date}
          onChange={date => setContent({ ...content, date })}
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>
      </Box>
    </Box>
  );
}

CalendarForm.propTypes = {
  onSubmit: PropTypes.func,
  event: PropTypes.object
};

export default CalendarForm;
