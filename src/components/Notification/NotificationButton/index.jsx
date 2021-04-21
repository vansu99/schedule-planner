import { Box, IconButton, Badge } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotifitionFeed from "../NotificationFeed";
import PopupCard from "components/PopupCard";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectNotifications, selectNotificationState } from "selectors/notification.selector";

function NotificationButton(props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notificationPopupTimeout, setShowNotificationPopupTimeout] = useState(null);
  const notifications = useSelector(selectNotifications);
  const notificationState = useSelector(selectNotificationState);

  useEffect(() => {
    // if (notificationPopupTimeout) {
    //   clearTimeout(notificationPopupTimeout);
    // }
    if (notificationState.unreadCount > 0) {
      !showNotificationPopup && setShowNotificationPopup(true);
      //setShowNotificationPopupTimeout(setTimeout(() => setShowNotificationPopup(false), 10000));
    }
  }, [notificationState.unreadCount]);

  useEffect(() => {
    if (showNotifications) {
      clearTimeout(notificationPopupTimeout);
      setShowNotificationPopup(false);
    }
  }, [showNotifications, notificationPopupTimeout]);

  return (
    <ClickAwayListener onClickAway={() => setShowNotifications(false)}>
      <Box position="relative" display="flex" alignItems="center" height="64px">
        <IconButton color="inherit" onClick={() => setShowNotifications(previous => !previous)}>
          <Badge badgeContent={notificationState.unreadCount} color="error">
            {showNotifications ? (
              <NotificationsIcon fontSize="large" style={{ cursor: "pointer" }} />
            ) : (
              <NotificationsNoneIcon fontSize="large" style={{ cursor: "pointer" }} />
            )}
          </Badge>
        </IconButton>
        {showNotifications && (
          <PopupCard>
            <NotifitionFeed open={showNotifications} setShowNotifications={setShowNotifications} />
          </PopupCard>
        )}
      </Box>
    </ClickAwayListener>
  );
}

NotificationButton.propTypes = {};

export default NotificationButton;
