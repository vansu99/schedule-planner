import { makeStyles } from '@material-ui/core/styles';
import PopupMenu from 'components/PopupMenu';
import { sortingDirection, taskSortingType } from 'helpers/sorting';
import React from 'react';

const useStyles = makeStyles(theme => ({
  sortOptionList: {
    margin: '0 .5rem',
  },
  sortOptionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem .5rem .5rem .8rem',
    borderRadius: '4px',
    '&:not(:last-child)': {
      marginBottom: '.5rem',
    },
    '& .action-title': {
      fontSize: '1.5rem',
    },
    '& .action-icon': {
      fontSize: '1.9rem',
      fontWeight: 600,
      marginLeft: '1.4rem',
    },
    '&:hover': {
      background: theme.palette.background.hover,
      cursor: 'pointer',
    },
  },
}));

const SortPopup = ({ sorting, onChangeTaskSorting, popupSorting, onClosePopupSorting }) => {
  const classes = useStyles();

  const handleSetSorting = sortData => {
    if (!onChangeTaskSorting) return;
    onChangeTaskSorting(sortData);
  };

  return (
    <PopupMenu id="sort" width="20rem" showPopup={popupSorting} closePopup={onClosePopupSorting}>
      <div className={classes.sortOptionList}>
        <div
          className={classes.sortOptionItem}
          onClick={() => handleSetSorting({ type: taskSortingType.NONE, direction: sortingDirection.ASC })}
        >
          <div className="action-title">None</div>
          {sorting?.type === taskSortingType.NONE && <i className="bx bx-check action-icon"></i>}
        </div>
        <div
          className={classes.sortOptionItem}
          onClick={() =>
            handleSetSorting({
              type: taskSortingType.TASK_TITLE_ALPHA,
              _sort: 'alpha',
              direction: sortingDirection.ASC,
            })
          }
        >
          <div className="action-title">Alphabetical</div>
          {sorting?.type === taskSortingType.TASK_TITLE_ALPHA && <i className="bx bx-check action-icon"></i>}
        </div>
        <div
          className={classes.sortOptionItem}
          onClick={() =>
            handleSetSorting({ type: taskSortingType.DUE_DATE, _sort: 'duedate', direction: sortingDirection.ASC })
          }
        >
          <div className="action-title">Due date</div>
          {sorting?.type === taskSortingType.DUE_DATE && <i className="bx bx-check action-icon"></i>}
        </div>
      </div>
    </PopupMenu>
  );
};

export default SortPopup;
