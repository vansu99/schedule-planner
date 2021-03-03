import axiosClient from "../services/axiosClient";

const listsApis = {
  getAllListsTodo: () => {
    return axiosClient.get("/api/lists");
  },
  getListTodoById: (id) => {
    return axiosClient.get(`/api/lists/${id}`);
  },
  createListTodo: (list) => {
    return axiosClient.post("/api/lists", list);
  },
  changeTitleListTodo: (id, title) => {
    return axiosClient.patch(`/api/lists/${id}`, title);
  },
};

export default listsApis;
