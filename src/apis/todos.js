import axiosClient from "../services/axiosClient";

const todosApis = {
  getAllCardTodo: () => {
    return axiosClient.get("/api/cards");
  },
  getCardTodoBySlug: slug => {
    return axiosClient.get(`/api/cards/${slug}`);
  },
  getCardTodoById: id => {
    return axiosClient.get(`/api/cards/${id}`);
  },
  createCardTodo: card => {
    return axiosClient.post("/api/cards", card);
  },
  removeCardTodo: id => {
    return axiosClient.delete(`/api/cards/${id}`);
  },
  updateSingleCardTodo: (id, title) => {
    return axiosClient.patch(`/api/cards/${id}`, title);
  },
  addCheckListTodoCard: (id, checklist) => {
    return axiosClient.patch(`/api/cards/${id}/checklist`, checklist);
  },
  removeCheckListTodoCard: (id, checklistId) => {
    return axiosClient.delete(`/api/cards/${id}/checklist/${checklistId}`);
  },
  addLabelTodoCard: (id, label) => {
    return axiosClient.patch(`/api/cards/${id}/label`, label);
  },
  addMemberTodoCard: (id, member) => {
    return axiosClient.patch(`/api/cards/${id}/member`, member);
  },
  removeMemberTodoCard: (id, memberId) => {
    return axiosClient.delete(`/api/cards/${id}/member/${memberId}`);
  },
  addCommentTodoCard: comment => {
    return axiosClient.post("/api/comments", comment);
  },
  updateCommentTodoCard: (id, content) => {
    return axiosClient.patch(`/api/comments/${id}`, content);
  },
  likeCommentTodoCard: (id, user) => {
    return axiosClient.patch(`/api/comments/${id}/like`, { user });
  },
  unLikeCommentTodoCard: (id, user) => {
    return axiosClient.patch(`/api/comments/${id}/unlike`, { user });
  }
};

export default todosApis;
