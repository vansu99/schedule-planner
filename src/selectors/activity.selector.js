import { createSelector } from 'reselect';

export const selectActivityState = (state) => state.activities;

export const selectActivities = createSelector(
  [selectActivityState],
  (activities) => activities.activities
);
