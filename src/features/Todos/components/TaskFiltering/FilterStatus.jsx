import PopupMenu from 'components/PopupMenu';
import { filteringType } from 'helpers/sorting';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  filterOptionList: {
    margin: '0 .5rem',
  },
  filterOptionItem: {
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

const FilterStatus = ({ filter, onChangeTaskStatusFilter, popupFilter, onClosePopupFilter }) => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const handleFilterChange = f => {
    if (!onChangeTaskStatusFilter) return;
    onChangeTaskStatusFilter(f);
  };

  return (
    <PopupMenu id="filter" width="20rem" showPopup={popupFilter} closePopup={onClosePopupFilter}>
      <div className={classes.filterOptionList}>
        <div className={classes.filterOptionItem} onClick={() => handleFilterChange({ type: filteringType.ALL_TASK })}>
          <span className="action-title">{translate('all_task')}</span>
          {filter?.type === filteringType.ALL_TASK && <i className="bx bx-check action-icon"/>}
        </div>
        <div className={classes.filterOptionItem} onClick={() => handleFilterChange({ type: filteringType.COMPLETE })}>
          <span className="action-title">{translate('complete')}</span>
          {filter?.type === filteringType.COMPLETE && <i className="bx bx-check action-icon"/>}
        </div>
        <div
          className={classes.filterOptionItem}
          onClick={() => handleFilterChange({ type: filteringType.INCOMPLETE })}
        >
          <span className="action-title">{translate('incomplete')}</span>
          {filter?.type === filteringType.INCOMPLETE && <i className="bx bx-check action-icon"/>}
        </div>
        <div className={classes.filterOptionItem} onClick={() => handleFilterChange({ type: filteringType.TODAY })}>
          <span className="action-title">{translate('today')}</span>
          {filter?.type === filteringType.TODAY && <i className="bx bx-check action-icon"/>}
        </div>
        <div className={classes.filterOptionItem} onClick={() => handleFilterChange({ type: filteringType.THISWEEK })}>
          <span className="action-title">{translate('this_week')}</span>
          {filter?.type === filteringType.THISWEEK && <i className="bx bx-check action-icon"/>}
        </div>
        <div className={classes.filterOptionItem} onClick={() => handleFilterChange({ type: filteringType.THISMONTH })}>
          <span className="action-title">{translate('this_month')}</span>
          {filter?.type === filteringType.THISMONTH && <i className="bx bx-check action-icon"/>}
        </div>
      </div>
    </PopupMenu>
  );
};

export default FilterStatus;
