import { todoActions } from 'configs';

const initialState = {
  activities: [],
};

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActions.GET_ACTIVITIES:
      return {
        ...state,
        activities: [...(action.payload.add ? state.activities : []), ...action.payload.activities],
        hasMore: action.payload.hasMore,
      };
    case todoActions.ADD_ACTIVITY:
      return {
        ...state,
        activities: [action.payload.activity, ...state.activities],
      };
    case todoActions.DELETE_ACTIVITY: {
      const activitiesLog = [...state.activities];
      const index = activitiesLog.findIndex(activity => activity._id === action.payload.activity._id);
      activitiesLog.splice(index, 1);
      return {
        ...state,
        activities: [...state.activitiesLog],
      };
    }

    case todoActions.CLEAR_ALL_ACTIVITY:
      return {
        ...state,
        activities: [...action.payload.activity],
      };

    case todoActions.ERROR_ACTIVITY:
      return { ...state, activityError: action.payload.error };

    default:
      return state;
  }
};
