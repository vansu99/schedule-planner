import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect } from 'react';
import TodoReportCard from './components/TodoReportCard';
import TodoReportPieChart from './components/TodoReportPieChart';
import TodoReportTable from './components/TodoReportTables';
import useStyles from './todoReport.theme';

function TodoReport({ reports = {}, team, totalCards, loading }) {
  const classes = useStyles();

  const calPercentCompletedTodo = useCallback(
    value => {
      let result = Math.round((value / totalCards) * 100).toFixed(1);
      return result || 0;
    },
    [totalCards],
  );

  useEffect(() => {
    document.title = 'Reports • Schedule Planner';
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.todoReportTitle}>
        Tổng quan báo cáo - <span>{reports.boardId?.title}</span>
      </Typography>
      <Typography variant="h4" className={classes.todoReportTitle}>
        Trạng thái công việc
      </Typography>
      <div className={classes.todoReportList}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper elevation={3}>
              <TodoReportCard loading={loading} title="Tổng công việc" completed={totalCards} color="#2E86AB" />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={3}>
              <TodoReportCard
                loading={loading}
                title="Chưa hoàn thành"
                completed={reports.cardFailed?.length}
                calPercent={calPercentCompletedTodo(reports.cardFailed?.length)}
                color="#FE4A49"
              />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={3}>
              <TodoReportCard
                title="Hoàn thành"
                loading={loading}
                completed={reports.cardCompleted?.length}
                calPercent={calPercentCompletedTodo(reports.cardCompleted?.length)}
                color="#35CE8D"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Typography variant="h4" className={classes.todoReportTitle}>
        Tiến trình hoàn thành công việc
      </Typography>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <TodoReportPieChart
              failed={calPercentCompletedTodo(reports.cardFailed?.length)}
              completed={calPercentCompletedTodo(reports.cardCompleted?.length)}
            />
          </Grid>
          <Grid item xs={7}>
            <TodoReportTable loading={loading} team={team} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

TodoReport.propTypes = {
  reports: PropTypes.object,
  allReports: PropTypes.array,
  team: PropTypes.array,
  totalCards: PropTypes.number,
  handleChangeBoard: PropTypes.func,
  loading: PropTypes.bool,
};

export default memo(TodoReport);
