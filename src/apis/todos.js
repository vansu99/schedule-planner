import axiosClient from "../services/axiosClient";

const todosApis = {
  getAllCardTodo: () => {
    return axiosClient.get("/api/cards");
  },
  getCardTodoBySlug: (slug) => {
    return axiosClient.get(`/api/cards/${slug}`);
  },
  getCardTodoById: (id) => {
    return axiosClient.get(`/api/cards/${id}`);
  },
  createCardTodo: (card) => {
    return axiosClient.post("/api/cards", card);
  },
  updateSingleCardTodo: (id, todo) => {
    return axiosClient.patch(`/api/cards/${id}`, todo);
  },
};

export default todosApis;
