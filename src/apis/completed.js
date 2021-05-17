import axiosClient from "../services/axiosClient";

const completedTodoApis = {
  getAllReport: () => {
    return axiosClient.get(`/api/reports`);
  },
  getReportByBoardId: boardId => {
    return axiosClient.post(`/api/reports/board`, { boardId });
  },
  getReportById: id => {
    return axiosClient.get(`/api/reports/${id}`);
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
  },
  getMemberTeamTodo: boardId => {
    return axiosClient.get(`/api/reports/completed/${boardId}`);
  }
};

export default completedTodoApis;
