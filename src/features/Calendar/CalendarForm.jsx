import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { Box, TextField, Button, Typography, Divider } from "@material-ui/core";
import DatePicker from "react-datepicker";
import { makeStyles } from "@material-ui/core/styles";

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
