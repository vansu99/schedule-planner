import { Button, IconButton, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  toolbar: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarMonth: {
    display: 'flex',
    textAlign: 'center',
    '& > .MuiIconButton-root:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

function CustomToolbar({ date, onNavigate }) {
  const { t: translate } = useTranslation();
  const classes = useStyles();

  const goToBack = () => {
    date.setMonth(date.getMonth() - 1);
    onNavigate('prev');
  };

  const goToNext = () => {
    date.setMonth(date.getMonth() + 1);
    onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    date.setMonth(now.getMonth());
    date.setYear(now.getFullYear());
    onNavigate('current');
  };

  const labelCalendar = () => {
    const dateCalendar = moment(date);
    return (
      <>
        <Typography variant="h4" component="h4">
          {dateCalendar.format('MMMM')}
        </Typography>
        <Typography variant="subtitle1">{dateCalendar.format('YYYY')}</Typography>
      </>
    );
  };

  return (
    <div className={classes.toolbar}>
      <Typography variant="h3" component="h3">
        {translate('calendar')}
      </Typography>
      <div className={classes.calendarMonth}>
        <IconButton style={{ border: '0' }} onClick={goToBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <span>{labelCalendar()}</span>
        <IconButton onClick={goToNext} style={{ border: '0' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <Button variant="outlined" onClick={goToCurrent}>
        {translate('today')}
      </Button>
    </div>
  );
}

CustomToolbar.propTypes = {
  onNavigate: PropTypes.func,
  label: PropTypes.string,
};

export default CustomToolbar;
