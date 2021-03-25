import axiosClient from "../services/axiosClient";

const boardsApis = {
  getAllBoardsTodo: () => {
    return axiosClient.get("/api/boards");
  },
  createBoardTodo: board => {
    return axiosClient.post("/api/boards", board);
  },
  addColumnIdTodo: (id, value) => {
    return axiosClient.patch(`/api/boards/${id}/column`, { value });
  },
  getBoardById: id => {
    return axiosClient.get(`/api/boards/${id}`);
  }
};

export default boardsApis;
