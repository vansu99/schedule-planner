import axiosClient from '../services/axiosClient';

const columnsApis = {
  getAllColumnListTodo: () => {
    return axiosClient.get('/api/columns');
  },
  createColumnTodo: id => {
    return axiosClient.post('/api/columns', id);
  },
  removeListIdTodo: id => {
    return axiosClient.delete(`/api/columns/${id}`);
  },
};

export default columnsApis;
