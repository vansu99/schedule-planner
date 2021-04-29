import { actShowLoading, actHideLoading } from "../Global";
import { completedTodoApis } from "apis";

const asyncGetReportTodoById = id => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await completedTodoApis.getReportById(id);
      if (result.status === 200) {
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

export const reportsActions = {
  asyncGetReportTodoById
};
