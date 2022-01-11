import { createSelector } from 'reselect';

export const dialogSelector = createSelector(
  (state) => state.app,
  (app) => app.dialog
);
