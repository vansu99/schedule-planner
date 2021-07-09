import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function SkeletonCpt(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );
}

Skeleton.propTypes = {};

export default SkeletonCpt;
