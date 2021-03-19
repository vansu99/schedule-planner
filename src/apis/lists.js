import axiosClient from "../services/axiosClient";

const listsApis = {
  getAllListsTodo: () => {
    return axiosClient.get("/api/lists");
  },
  getListTodoById: id => {
    return axiosClient.get(`/api/lists/${id}`);
  },
  createListTodo: list => {
    return axiosClient.post("/api/lists", list);
  },
  changeTitleListTodo: (id, title) => {
    return axiosClient.patch(`/api/lists/${id}`, title);
  },
  removeListById: id => {
    return axiosClient.delete(`/api/lists/${id}`);
  },
  addCardIdToList: (id, value) => {
    return axiosClient.post(`/api/lists/${id}/cardId`, { value });
  },
  removeCardIdToList: (id, cardId) => {
    return axiosClient.delete(`/api/lists/${id}/cardId/${cardId}`);
  }
};

export default listsApis;
