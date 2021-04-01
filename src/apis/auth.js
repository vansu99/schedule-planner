import axiosClient from "../services/axiosClient";

const userApis = {
  login: user => {
    return axiosClient.post("/api/auth/login", user);
  },
  register: user => {
    return axiosClient.post("/api/auth/register", user);
  },
  logout: () => {
    return axiosClient.post("/api/auth/logout");
  },
  getMe: () => {
    return axiosClient.post("/api/auth/me");
  },
  searchUser: search => {
    return axiosClient.get(`/api/users/search/by?username=${search}`);
  },
  updateUserProfile: (id, user) => {
    return axiosClient.patch(`/api/users/${id}`, user);
  },
  addBoardIdToUser: (id, value) => {
    return axiosClient.post(`/api/users/${id}/boards`, { value });
  }
};

export default userApis;
