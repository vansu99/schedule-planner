import axiosClient from '../services/axiosClient';

const boardsApis = {
  getAllBoardsTodo: () => {
    return axiosClient.get('/api/boards');
  },
  createBoardTodo: board => {
    return axiosClient.post('/api/boards', board);
  },
  addColumnIdTodo: (id, value) => {
    return axiosClient.patch(`/api/boards/${id}/column`, { value });
  },
  getBoardById: ids => {
    return axiosClient.post(`/api/boards/ids`, { ids });
  },
  updateBoardById: (id, data) => {
    return axiosClient.patch(`/api/boards/${id}`, data);
  },
  removeBoardById: id => {
    return axiosClient.delete(`/api/boards/${id}`);
  },
  removeColumnIdBoardById: (id, columnId) => {
    return axiosClient.delete(`/api/boards/${id}/column/${columnId}`);
  },
  getListsFromBoard: id => {
    return axiosClient.get(`/api/boards/${id}/lists`);
  },
  getCardsFromBoard: id => {
    return axiosClient.get(`/api/boards/${id}/cards`);
  },
  getColumnsFromBoard: id => {
    return axiosClient.get(`/api/boards/${id}/columns`);
  },
  getActivityFromBoard: (id, params) => {
    return axiosClient.get(`/api/boards/${id}/activity?${params}`);
  },
  searchBoard: search => {
    return axiosClient.get(`/api/boards/search/by?title=${search}`);
  },
  addMemberProject: (id, member) => {
    return axiosClient.patch(`/api/boards/${id}/member`, member);
  },
  removeMemberProject: (id, memberId) => {
    return axiosClient.delete(`/api/boards/${id}/member/${memberId}`);
  },
};

export default boardsApis;
