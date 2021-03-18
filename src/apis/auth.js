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
    return axiosClient.get(`/api/users/search?username=${search}`);
  }
};

export default userApis;
