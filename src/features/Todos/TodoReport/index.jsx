import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { memo, useCallback } from "react";
import TodoReportCard from "./components/TodoReportCard";
import TodoReportPieChart from "./components/TodoReportPieChart";
import TodoReportTable from "./components/TodoReportTables";
import useStyles from "./todoReport.theme";

function TodoReport({ reports = {}, allReports, totalCards, handleChangeBoard }) {
  const classes = useStyles();
  const calPercentCompletedTodo = useCallback(
    value => {
      let result = Math.round((value / totalCards) * 100).toFixed(2);
      return result;
    },
    [totalCards]
  );

  const onChangeBoard = e => {
    if (handleChangeBoard) {
      handleChangeBoard(e.target.value);
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4" className={classes.todoReportTitle}>
          Tổng quan báo cáo
        </Typography>
        <FormControl size="small" variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Board</InputLabel>
          <Select
            onChange={onChangeBoard}
            native
            label="Board"
            inputProps={{
              name: "board",
              id: "outlined-board-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            {allReports?.map(report => (
              <option key={report._id} value={report._id}>
                {report?.boardId.title}
              </option>
            ))}
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
            <TodoReportPieChart
              failed={calPercentCompletedTodo(reports.cardFailed?.length)}
              completed={calPercentCompletedTodo(reports.cardCompleted?.length)}
            />
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
  allReports: PropTypes.array,
  totalCards: PropTypes.number,
  handleChangeBoard: PropTypes.func
};

export default memo(TodoReport);
