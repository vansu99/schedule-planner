import { createSelector } from "reselect";

const getUser = (state) => state.user;

export const getUserInAuthenticated = createSelector([getUser], (user) => user.isAuthenticated);
