import { Box, Button, Divider, InputAdornment, TextField, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import { DateTimePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
    outline: "none"
  },
  btnSubmit: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "& > .MuiButton-label": {
      fontSize: "12px"
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
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
        {/* <DatePicker
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
        /> */}
        <DateTimePicker
          className={classes.datePicker}
          value={content && content?.date}
          onChange={date => setContent({ ...content, date })}
          format="dd/MM/yyyy HH:mm"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AlarmIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Button className={classes.btnSubmit} onClick={handleSubmit}>
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
