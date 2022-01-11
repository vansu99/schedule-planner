import axiosClient from '../services/axiosClient';

const labelsApis = {
  getAllLabelsTodo: () => {
    return axiosClient.get('/api/labels');
  },
  getLabelTodoById: (id) => {
    return axiosClient.get(`/api/labels/${id}`);
  },
  createLabelTodo: (label) => {
    return axiosClient.post('/api/labels', label);
  },
};

export default labelsApis;
