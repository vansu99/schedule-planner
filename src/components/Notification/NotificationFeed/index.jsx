import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PropTypes from "prop-types";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./theme.NotificationFeed";
import { selectNotificationState, selectNotifications } from "selectors/notification.selector";
import { fetchNotificationsStart, readNotificationsStart, clearNotifications } from "actions/Global";
import SkeletonCpt from "components/Skeleton";
import { Link } from "react-router-dom";
import { Avatar, Divider } from "@material-ui/core";

function NotificationFeef({ open, onClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const notifications = useSelector(selectNotifications);
  const notificationState = useSelector(selectNotificationState);
  useEffect(() => {
    (async function () {
      await dispatch(fetchNotificationsStart());
      await dispatch(readNotificationsStart());
    })();

    return () => {
      dispatch(clearNotifications());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      {notificationState.fetching ? (
        <SkeletonCpt />
      ) : notifications.length > 0 ? (
        notifications.map((notification, idx) => {
          const userCardProps = {
            username: notification.sender.username,
            avatar: notification.sender.avatar,
            subTextDark: true,
            date: notification.date
          };
          let userCardChild = null;

          switch (notification.notificationType) {
            case "like":
              {
                userCardProps.subTextDark = "liked your comment";
                userCardChild = <div></div>;
              }

              break;

            default:
              {
                userCardProps.subTextDark = <Link></Link>;
              }
              break;
          }
          return (
            <li key={idx}>
              <Box className={classes.notifyItem}>
                <Avatar />
                <Box ml={1.4} className={classes.notifyItemContent}>
                  <Typography variant="h6" component="h6">
                    {userCardProps.username}
                  </Typography>
                  <Typography variant="h6" component="p" style={{ fontWeight: 400 }}>
                    {userCardProps.subTextDark}
                  </Typography>
                  <Typography variant="subtitle1" component="span" color="primary">
                    {moment(userCardProps.date).fromNow()}
                  </Typography>
                </Box>
                {userCardChild && userCardChild}
              </Box>
              {notifications?.length - 1 > idx && <Divider />}
            </li>
          );
        })
      ) : (
        <Box className={classes.root}>
          <HelpOutlineIcon fontSize="large" />
          <Typography variant="h3" component="h3">
            Activity On Your Posts
          </Typography>
          <Typography variant="subtitle1" component="p">
            When someone likes or comments on your posts, you'll see them here.
          </Typography>
        </Box>
      )}
    </React.Fragment>
  );
}

NotificationFeef.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setShowNotifications: PropTypes.func
};

export default NotificationFeef;
