import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TodoReportTables({ team = [], loading }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell align="right">Cần làm</TableCell>
            <TableCell align="right">Chưa hoàn thành</TableCell>
            <TableCell align="right">Hoàn thành</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" height={50} width="100%" />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {(team || []).map((row) => (
              <TableRow key={row?.id}>
                <TableCell component="th" scope="row">
                  {row?.username}
                </TableCell>
                <TableCell align="right">{row.failed}</TableCell>
                <TableCell align="right">{row.failed}</TableCell>
                <TableCell align="right">{row.completed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

TodoReportTables.propTypes = {};

export default TodoReportTables;
