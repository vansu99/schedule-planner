import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { filteringType, sortingDirection, taskSortingType } from 'helpers/sorting';
import { useToggleMenus } from 'hooks';
import React, { useState } from 'react';
import FilterStatus from './FilterStatus';
import SortPopup from './SortPopup';
import { useTranslation } from "react-i18next";

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

const renderTaskSortingLabel = (sorting, translate) => {
  if (sorting.type === taskSortingType.TASK_TITLE) {
    return translate('sort_alpha')
  }
  if (sorting.type === taskSortingType.DUE_DATE) {
    return translate('sort_due')
  }
  return translate('sort');
};

const renderTaskFilterLabel = (sorting, translate) => {
  if (sorting.type === filteringType.COMPLETE) {
    return translate('filter_complete');
  }
  if (sorting.type === filteringType.INCOMPLETE) {
    return translate('filter_incomplete');
  }
  if (sorting.type === filteringType.THISMONTH) {
    return translate('filter_month');
  }
  if (sorting.type === filteringType.THISWEEK) {
    return translate('filter_week');
  }
  if (sorting.type === filteringType.TODAY) {
    return translate('filter_today');
  }
  return translate('filter');
};

const TaskFiltering = ({ onChangeSort, onChangeFilter }) => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
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
          <i className="bx bx-filter icon-filter"/>
          <span className="title-filter">{renderTaskFilterLabel(taskStatusFilter, translate)}</span>
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
          <i className="bx bx-sort icon-filter"/>
          <span className="title-filter">{renderTaskSortingLabel(taskSorting, translate)}</span>
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
