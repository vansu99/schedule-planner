import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import React, { memo, useCallback } from "react";
import TodoReportCard from "./components/TodoReportCard";
import TodoReportPieChart from "./components/TodoReportPieChart";
import TodoReportTable from "./components/TodoReportTables";
import useStyles from "./todoReport.theme";

function TodoReport({ reports = {}, totalCards }) {
  const classes = useStyles();

  const calPercentCompletedTodo = useCallback(
    value => {
      let result = Math.round((value / totalCards) * 100).toFixed(2);
      return result;
    },
    [totalCards]
  );

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4" className={classes.todoReportTitle}>
          Tổng quan báo cáo
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
          <Select
            native
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
      </div>
      <Typography variant="h4" className={classes.todoReportTitle}>
        Trạng thái công việc
      </Typography>
      <div className={classes.todoReportList}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper elevation={3}>
              <TodoReportCard title="Tổng công việc" completed={totalCards} color="#2E86AB" />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={3}>
              <TodoReportCard
                title="Quá hạn"
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
            <TodoReportPieChart />
          </Grid>
          <Grid item xs={7}>
            <TodoReportTable />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

TodoReport.propTypes = {
  reports: PropTypes.object,
  totalCards: PropTypes.number
};

export default memo(TodoReport);
