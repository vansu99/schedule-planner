import { createSelector } from "reselect";

const selectorGetColumn = (state) => state.todo.columns;
const selectorGetLists = (state) => state.todo.lists;
const selectorGetCards = (state) => state.todo.cards;

export const getColumns = createSelector(selectorGetColumn, (columns) => columns);
export const getLists = createSelector(selectorGetLists, (list) => list);
export const getCards = createSelector(selectorGetCards, (card) => card);
export const getCheckLists = createSelector(selectorGetCards, (card) => card.checklist);
