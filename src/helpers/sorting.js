import moment from 'moment'

export const taskSortingType = {
  NONE: 'NONE',
  ALL: 'ALL',
  COMPLETE: 'COMPLETE',
  INCOMPLETE: 'INCOMPLETE',
  DUE_DATE: 'DUE_DATE',
  MEMBERS: 'MEMBERS',
  LABELS: 'LABELS',
  TASK_TITLE_ALPHA: 'TASK_TITLE_ALPHA',
};

export const sortingDirection = {
  ASC: 'asc',
  DESC: 'desc',
};

export const filteringType = {
  ALL_TASK: 'all',
  TODAY: 'today',
  THISWEEK: 'week',
  THISMONTH: 'month',
  COMPLETE: 'complete',
  INCOMPLETE: 'incomplete',
};

export function sortString(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

export function filterTask(item, taskFiltering) {
  let day = moment(new Date().toISOString()).format('YYYY-MM-DD')
  let today = moment(day);
  let first = moment().startOf('week').format('YYYY-MM-DD') // monday
  let last = moment().endOf('week').format('YYYY-MM-DD') // friday
  let firstDayMonth = moment().startOf('month')
  let lastDayMonth = moment().endOf('month')

  if (taskFiltering.type === filteringType.ALL_TASK) {
    return item;
  }
  if (taskFiltering.type === filteringType.TODAY) {
    const date = moment(item.date).format('YYYY-MM-DD')
    if (today.isSame(date)) {
      return item;
    } else {
      return 0;
    }
  }
  if (taskFiltering.type === filteringType.THISWEEK) {
    if (moment(item.date).format('YYYY-MM-DD') >= first && moment(item.date).format('YYYY-MM-DD') <= last) {
      return item;
    } else {
      return 0;
    }
  }
  if (taskFiltering.type === filteringType.THISMONTH) {
    if (new Date(item.date) >= firstDayMonth && new Date(item.date) <= lastDayMonth) {
      return item;
    } else {
      return 0;
    }
  }
  if (taskFiltering.type === filteringType.COMPLETE) {
    return item.completed === true;
  }
  if (taskFiltering.type === filteringType.INCOMPLETE) {
    return item.completed === false;
  }
}

export function sortTask(a, b, taskSorting) {
  if (taskSorting.type === taskSortingType.NONE) {
    return 0;
  }
  if (taskSorting.type === taskSortingType.TASK_TITLE_ALPHA) {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  }
  if (taskSorting.type === taskSortingType.DUE_DATE) {
    if (a.date && !b.date) {
      return -1;
    } else if (b.date && !a.date) {
      return 1;
    } else {
      return 0;
    }
  }
  if (taskSorting.type === taskSortingType.COMPLETE) {
    if (a.complete && !b.complete) {
      return -1;
    } else if (b.complete && !a.complete) {
      return 1;
    } else {
      return 0;
    }
  }
}
