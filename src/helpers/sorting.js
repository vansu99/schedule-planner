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
  TASK_TITLE: 'TASK_TITLE',
  ALL_TASK: 'ALL_TASK',
  TODAY: 'today',
  THISWEEK: 'week',
  THISMONTH: 'month',
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
