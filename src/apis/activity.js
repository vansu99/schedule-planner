import axiosClient from '../services/axiosClient';

const activityApis = {
  createNewActivity: params => {
    return axiosClient.post('/api/activities', params);
  },
  deleteActivity: id => {
    return axiosClient.delete(`/api/activities/${id}`);
  },
  clearAllActivity: boardId => {
    return axiosClient.delete(`/api/activities/clear/${boardId}`);
  },
};

export default activityApis;
