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
};

export default todosApis;
