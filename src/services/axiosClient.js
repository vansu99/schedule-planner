import axios from "axios";
import queryString from "query-string";
import { pathName, StorageKeys } from "configs";
import { localStorageService } from "hooks/useLocalStorage";
import history from "helpers/history";

const { clearTokens, getRefreshToken } = localStorageService;
const API_URL = "http://localhost:8080";
// https://projectfinaltodo.herokuapp.com
// http://localhost:8080

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
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
    if (error.response) {
      const origionalRequest = error.config;
      if (error.response.status === 401 && origionalRequest.url === `/auth/refresh/`) {
        // logout
      }
    }

    return Promise.reject(error);
  }
);

async function forceRenewToken() {
  const refreshToken = getRefreshToken();
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
