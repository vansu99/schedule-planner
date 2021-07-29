import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { filteringType, sortingDirection, taskSortingType } from 'helpers/sorting';
import { useToggleMenus } from 'hooks';
import React, { useState } from 'react';
import FilterStatus from './FilterStatus';
import SortPopup from './SortPopup';

const useStyles = makeStyles(theme => ({
  filterLists: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 1 auto',
    marginRight: '3rem',
  },
  filterItem: {
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: theme.palette.background.hover,
      cursor: 'pointer',
    },
    '&:not(:last-child)': {
      marginRight: '1rem',
    },
    '& .icon-filter': {
      fontSize: '2rem',
    },
    '& .title-filter': {
      fontSize: '1.6rem',
      marginLeft: '2px',
    },
  },
}));

const renderTaskSortingLabel = sorting => {
  if (sorting.type === taskSortingType.TASK_TITLE) {
    return 'Sort: Alphabetical';
  }
  if (sorting.type === taskSortingType.DUE_DATE) {
    return 'Sort: Due Date';
  }
  return 'Sort';
};

const renderTaskFilterLabel = sorting => {
  if (sorting.type === filteringType.COMPLETE) {
    return 'Filter: Task Complete';
  }
  if (sorting.type === filteringType.INCOMPLETE) {
    return 'Filter: Task Incomplete';
  }
  if (sorting.type === filteringType.THISMONTH) {
    return 'Filter: Due this month';
  }
  if (sorting.type === filteringType.THISWEEK) {
    return 'Filter: Due this week';
  }
  if (sorting.type === filteringType.TODAY) {
    return 'Filter: Today';
  }
  return 'Filter';
};

const TaskFiltering = ({ onChangeSort, onChangeFilter }) => {
  const classes = useStyles();
  const [taskSorting, setTaskSorting] = useState({ type: taskSortingType.NONE, direction: sortingDirection.ASC });
  const [taskStatusFilter, setTaskStatusFilter] = useState({ type: filteringType.ALL_TASK });
  const [popupFilter, togglePopupFilter, closePopupFilter] = useToggleMenus(null);
  const [popupSorting, togglePopupSorting, closePopupSorting] = useToggleMenus(null);

  const handleChangeSort = data => {
    setTaskSorting({ ...data });
    onChangeSort && onChangeSort(data);
  };

  const handleChangeFilter = data => {
    setTaskStatusFilter({ ...data });
    onChangeFilter && onChangeFilter(data);
  };

  return (
    <div className={classes.filterLists}>
      <div className={classes.filterItem}>
        <Box display="flex" alignItems="center" onClick={togglePopupFilter} aria-controls="filter" aria-haspopup="true">
          <i className="bx bx-filter icon-filter"></i>
          <span className="title-filter">{renderTaskFilterLabel(taskStatusFilter)}</span>
        </Box>
        <FilterStatus
          filter={taskStatusFilter}
          onChangeTaskStatusFilter={handleChangeFilter}
          popupFilter={popupFilter}
          onClosePopupFilter={closePopupFilter}
        />
      </div>
      <div className={classes.filterItem}>
        <Box
          display="flex"
          alignItems="center"
          onClick={togglePopupSorting}
          aria-controls="filter"
          aria-haspopup="true"
        >
          <i className="bx bx-sort icon-filter"></i>
          <span className="title-filter">{renderTaskSortingLabel(taskSorting)}</span>
        </Box>
        <SortPopup
          sorting={taskSorting}
          onChangeTaskSorting={handleChangeSort}
          popupSorting={popupSorting}
          onClosePopupSorting={closePopupSorting}
        />
      </div>
    </div>
  );
};

export default TaskFiltering;
