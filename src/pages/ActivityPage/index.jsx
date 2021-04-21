import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NotificationFeed from "components/Notification/NotificationFeed";
import Typography from "@material-ui/core/Typography";

function ActivityPage(props) {
  useEffect(() => {
    document.title = "Scheduler";
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h3" component="h3">
        Activity
      </Typography>
      <main>
        <NotificationFeed />
      </main>
    </React.Fragment>
  );
}

ActivityPage.propTypes = {};

export default ActivityPage;
