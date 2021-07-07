import { todoActions } from "configs";
import { activityApis } from "apis";

const asyncCreateNewActivity = params => {
  return async dispatch => {
    try {
      const result = await activityApis.createNewActivity(params);
      if (result.status === 201) {
        dispatch({
          type: todoActions.ADD_ACTIVITY,
          payload: { activity: result.data.respData }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncDeleteActivity = id => {
  return async dispatch => {
    try {
      const result = await activityApis.deleteActivity(id);
      if (result.status === 200) {
        dispatch({
          type: todoActions.DELETE_ACTIVITY,
          payload: { activity: result.data }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const activityActions = {
  asyncDeleteActivity,
  asyncCreateNewActivity
};
