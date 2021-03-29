import { createSelector } from "reselect";

const selectorGetColumn = state => state.todo.columns;
const selectorGetLists = state => state.todo.lists;
const selectorGetCards = state => state.todo.cards;
const selectorGetBoards = state => state.todo.boards;
const selectorGetBoardById = state => state.todo.currBoard;

export const getColumns = createSelector(selectorGetColumn, columns => columns);
export const getBoards = createSelector(selectorGetBoards, boards => boards);
export const getCurrBoard = createSelector(selectorGetBoardById, board => board);
export const getLists = createSelector(selectorGetLists, list => list);
export const getCards = createSelector(selectorGetCards, card => card);
export const getCheckLists = createSelector(selectorGetCards, card => card.checklist);
