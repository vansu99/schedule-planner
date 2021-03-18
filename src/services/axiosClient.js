import axios from "axios";
import queryString from "query-string";
import { pathName, StorageKeys } from "../configs";
import history from "../helpers/history";

const API_URL = "http://localhost:3001";
// https://projectfinaltodo.herokuapp.com

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 4000,
  headers: {
    "Content-Type": "application/json"
  },

  paramsSerializer: params => queryString.stringify(params)
});

// Request Interceptors
axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === 401) {
      history.push(pathName.LOGIN);
      forceRenewToken();
    }
    return Promise.reject(error);
  }
);

async function forceRenewToken() {
  const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);
  if (!refreshToken) {
    history.push(pathName.LOGIN);
  }
  return axiosClient
    .post("/api/auth/refresh", { refresh: refreshToken })
    .then(res => {
      // save token new and update header
      axiosClient.defaults.headers["Authorization"] = `Bearer ${res.data.refToken}`;
      localStorage.setItem(StorageKeys.TOKEN, res.data.refToken);
    })
    .catch(error => {
      console.log(error);
    });
}

export default axiosClient;
