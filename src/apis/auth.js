import axiosClient from "../services/axiosClient";

const userApis = {
  login: (user) => {
    return axiosClient.post("/api/auth/login", user);
  },
  register: (user) => {
    return axiosClient.post("/api/auth/register", user);
  },
  logout: () => {
    return axiosClient.post("/api/auth/logout");
  },
};

export default userApis;
