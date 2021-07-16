import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectActivityState } from 'selectors/activity.selector';
import { boardActions } from 'actions/Todos/board.action';
import ButtonComponent from 'components/Button';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: '90px',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    height: '100%',
  },
  text: {
    fontSize: '15px',
  },
  timestamp: {
    fontSize: '11px',
    color: '#637187',
  },
}));

function ActivityPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [dt, setDate] = useState(new Date().toLocaleString());
  const { activities, hasMore } = useSelector(selectActivityState);

  useEffect(() => {
    document.title = 'Scheduler';
  }, []);

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(secTimer);
  }, []);

  const handleLoadMoreActivity = () => {
    const lastActivity = activities[activities.length - 1];
    dispatch(boardActions.asyncGetActivity(boardId, lastActivity._id, 10));
  };

  return (
    <div className={classes.wrapper}>
      {activities.map((activity, idx) => {
        const date = new Date(activity.createdAt);
        const str = moment(date).fromNow();
        var timestampString;
        const userName = activity.text?.split(' ').slice(0, 2).join(' ');
        const activityText = activity.text?.replace(userName, '');
        if (str.includes('second') || str.includes('minute') || str.includes('hour')) timestampString = str;
        else if (str.includes('day') && (str.split(' ')[0] === 'a' || str.split(' ')[0] < 7)) {
          if (str === 'a day ago') {
            const timeString = moment().subtract(1, 'days').calendar().split(' at ')[0];
            timestampString = `${timeString} at ${moment(date).format('LT')}`;
          } else {
            const timeString = moment().subtract(str.split(' ')[0], 'days').calendar().split(' at ')[0];
            timestampString = `${timeString} at ${moment(date).format('LT')}`;
          }
        } else timestampString = moment(date).format('LLL');
        return (
          <div key={activity._id} className={classes.text}>
            <strong>{userName}</strong>
            {activityText}
            <p className={classes.timestamp}>{timestampString}</p>
          </div>
        );
      })}
      {hasMore && <ButtonComponent text="Load more activities" type="form" handleClick={handleLoadMoreActivity} />}
    </div>
  );
}

export default ActivityPage;
