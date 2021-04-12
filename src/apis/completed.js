import axiosClient from "../services/axiosClient";

const completedTodoApis = {
  getReportById: boardId => {
    return axiosClient.post(`/api/reports`, { boardId });
  },
  createReportTodo: boardId => {
    return axiosClient.post("/api/reports", { boardId });
  },
  addCompletedTodo: (boardId, value) => {
    return axiosClient.patch(`/api/reports/completed`, { boardId, value });
  },
  addFailedTodo: (boardId, value) => {
    return axiosClient.patch(`/api/reports/failed`, { boardId, value });
  },
  removeFailedTodo: (boardId, failedId) => {
    return axiosClient.patch(`/api/reports/failed/${failedId}`, { boardId });
  }
};

export default completedTodoApis;
