const todoActions = {
  GET_LISTS: "TRELLO/GET_LISTS",
  ADD_LIST: "TRELLO/ADD_LIST",
  CHANGE_TITLE_LIST: "TRELLO/CHANGE_TITLE_LIST",
  REMOVE_LIST: "TRELLO/REMOVE_LIST",

  GET_CARDS: "TRELLO/GET_CARDS",
  ADD_CARD: "TRELLO/ADD_CARD",
  ADD_DEADLINE_TODO_CARD: "TRELLO/ADD_DEADLINE_TODO_CARD",
  ADD_MEMBER_TODO_CARD: "TRELLO/ADD_MEMBER_TODO_CARD",
  REMOVE_MEMBER_TODO_CARD: "TRELLO/REMOVE_MEMBER_TODO_CARD",
  ADD_CHECKLIST_TODO_CARD: "TRELLO/ADD_CHECKLIST_TODO_CARD",
  EDIT_CHECKLIST_TODO_CARD: "TRELLO/EDIT_CHECKLIST_TODO_CARD",
  REMOVE_CHECKLIST_TODO_CARD: "TRELLO/REMOVE_CHECKLIST_TODO_CARD",
  REMOVE_CARD: "TRELLO/REMOVE_CARD",
  EDIT_CARD: "TRELLO/EDIT_CARD",
  EDIT_DESC_CARD: "TRELLO/EDIT_DESC_CARD",

  GET_COLUMNS: "TRELLO/GET_COLUMNS",

  ADD_LABEL: "TRELLO/ADD_LABEL",
  EDIT_LABEL: "TRELLO/EDIT_LABEL",
  REMOVE_LABEL: "TRELLO/REMOVE_LABEL",

  DRAG_END_LIST: "TRELLO/DRAG_END_LIST",
  DRAG_END_CARD: "TRELLO/DRAG_END_CARD"
};

export default todoActions;
