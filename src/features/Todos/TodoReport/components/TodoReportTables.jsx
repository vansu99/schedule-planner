import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function TodoReportTables({ team }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell align="right">Cần làm</TableCell>
            <TableCell align="right">Quá hạn</TableCell>
            <TableCell align="right">Hoàn thành</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.userId.username}
              </TableCell>
              <TableCell align="right">{row.failed.length}</TableCell>
              <TableCell align="right">{row.failed.length}</TableCell>
              <TableCell align="right">{row.completed.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TodoReportTables.propTypes = {};

export default TodoReportTables;
