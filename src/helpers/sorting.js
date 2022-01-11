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
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let first = today.getDate() - today.getDay();
  let last = first + 6;
  let firstday = new Date(today.setDate(first));
  let lastday = new Date(today.setDate(last));
  let firstDayMonth = new Date(today.setDate(1));
  let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  if (taskFiltering.type === filteringType.ALL_TASK) {
    return item;
  }
  if (taskFiltering.type === filteringType.TODAY) {
    const date = new Date(item.date);
    if (date === today) {
      return item;
    } else {
      return 0;
    }
  }
  if (taskFiltering.type === filteringType.THISWEEK) {
    if (new Date(item.date) >= firstday && new Date(item.date) <= lastday) {
      return item;
    } else {
      return 0;
    }
  }
  if (taskFiltering.type === filteringType.THISMONTH) {
    if (
      new Date(item.date) >= firstDayMonth &&
      new Date(item.date) <= lastDayMonth
    ) {
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
