import { todoActions } from 'configs';

const editEventTodo = (event) => {
  return {
    type: todoActions.EDIT_EVENT_TODO,
    payload: event,
  };
};

const openEditEvent = () => ({
  type: todoActions.OPEN_EVENT_FORM,
});

const closeEditEvent = () => ({
  type: todoActions.CLOSE_EVENT_FORM,
});

export const calendarActions = {
  editEventTodo,
  openEditEvent,
  closeEditEvent,
};
