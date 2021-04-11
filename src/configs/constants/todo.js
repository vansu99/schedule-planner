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

  GET_ALL_BOARDS: "TRELLO/GET_ALL_BOARDS",
  GET_BOARD_BY_ID: "TRELLO/GET_BOARD_BY_ID",
  GET_LIST_FROM_BOARD: "TRELLO/GET_LIST_FROM_BOARD",
  GET_CARD_FROM_BOARD: "TRELLO/GET_CARD_FROM_BOARD",
  ADD_BOARDS: "TRELLO/ADD_BOARDS",
  ADD_COLUMNID_TODO_BOARD: "TRELLO/ADD_COLUMNID_TODO_BOARD",

  ADD_COMMENT_TODO_CARD: "TRELLO/ADD_COMMENT_TODO_CARD",
  UPDATE_COMMENT_TODO_CARD: "TRELLO/UPDATE_COMMENT_TODO_CARD",
  LIKE_COMMENT_TODO_CARD: "TRELLO/LIKE_COMMENT_TODO_CARD",
  UNLIKE_COMMENT_TODO_CARD: "TRELLO/UNLIKE_COMMENT_TODO_CARD",

  ADD_LABEL: "TRELLO/ADD_LABEL",
  EDIT_LABEL: "TRELLO/EDIT_LABEL",
  REMOVE_LABEL: "TRELLO/REMOVE_LABEL",

  DRAG_END_LIST: "TRELLO/DRAG_END_LIST",
  DRAG_END_CARD: "TRELLO/DRAG_END_CARD",

  ADD_COMPLETE_TODO_REPORT: "ADD_COMPLETE_TODO_REPORT",
  ADD_FAILED_TODO_REPORT: "ADD_FAILED_TODO_REPORT",
  CREATE_REPORT_TODO: "CREATE_REPORT_TODO",
  GET_REPORT_TODO_BYID: "GET_REPORT_TODO_BYID"
};

export default todoActions;
