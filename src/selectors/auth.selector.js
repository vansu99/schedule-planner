import { createSelector } from "reselect";

const selectorUser = state => state.user;

export const getCurrentUser = createSelector(selectorUser, user => user.currentUser);
