import { createSelector } from 'reselect';

const selectorUser = state => state.user;

export const selectError = createSelector([selectorUser], user => user.error);
export const getCurrentUser = createSelector(selectorUser, user => user.currentUser);
export const selectFetchingAvatar = createSelector(selectorUser, user => user.fetchingAvatar);
