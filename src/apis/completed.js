import axiosClient from "../services/axiosClient";

const completedTodoApis = {
  getReportById: boardId => {
    return axiosClient.post(`/api/reports`, { boardId });
  },
  createReportTodo: boardId => {
    return axiosClient.post("/api/reports", { boardId });
  },
  addCompletedTodo: (id, value) => {
    return axiosClient.patch(`/api/reports/${id}/completed`, { value });
  },
  addFailedTodo: (id, value) => {
    return axiosClient.patch(`/api/reports/${id}/failed`, { value });
  }
};

export default completedTodoApis;
