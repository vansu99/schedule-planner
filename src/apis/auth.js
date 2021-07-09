import axiosClient from '../services/axiosClient';

const userApis = {
  login: user => {
    return axiosClient.post('/api/auth/login', user);
  },
  loginWithGoogle: user => {
    return axiosClient.post('/api/auth/google', user);
  },
  register: user => {
    return axiosClient.post('/api/auth/register', user);
  },
  logout: () => {
    return axiosClient.post('/api/auth/logout');
  },
  getMe: () => {
    return axiosClient.post('/api/auth/me');
  },
  searchUser: search => {
    return axiosClient.get(`/api/users/search/by?username=${search}`);
  },
  updateUserProfile: (id, user) => {
    return axiosClient.patch(`/api/users/${id}`, user);
  },
  addBoardIdToUser: (id, value) => {
    return axiosClient.post(`/api/users/${id}/boards`, { value });
  },
  changeAvatar: image => {
    const formData = new FormData();
    formData.append('image', image);
    return axiosClient.put('/api/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  removeAvatar: () => {
    return axiosClient.delete('/api/users/avatar');
  },
};

export default userApis;
