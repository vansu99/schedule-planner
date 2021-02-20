import axios from "axios";
import queryString from "query-string";
import { pathName } from "../configs";
import history from "../helpers/history";

const API_URL = "https://projectclimate.herokuapp.com";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Request Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_Token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let original_request = error.config;
    const { config, data, status, statusText } = error.response;
    const URL = ["/api/auth/login", "/api/auth/register"];

    if (URL.includes(config.url) && status === 403) {
      throw new Error(data.error);
    } else if (status === 401 && original_request.url === API_URL + "/api/auth/refresh") {
      history.push({ pathname: pathName.LOGIN });
      return Promise.reject(error);
    }

    // Catch expired token, attemp to refresh
    if (data.code === "token_not_valid" && status === 401 && statusText === "Unauthorized") {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        const tokenParts = JSON.parse(atob(refresh_token.split(".")[1]));
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosClient
            .post("/api/auth/refresh", { refresh: refresh_token })
            .then((response) => {
              // Save tokens and update headers
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);
              axiosClient.defaults.headers["Authorization"] = "Bearer " + response.data.access;
              original_request.headers["Authorization"] = "Bearer " + response.data.access;

              // Try original request
              return axiosClient(original_request);
            })
            .catch((err) => {
              console.log("Token Refresh: Attempt failed.\n" + err);
            });
        } else {
          console.log("Token Refresh: Refresh token expired", tokenParts.exp, now);
          history.push({ pathname: pathName.LOGIN });
        }
      } else {
        console.log("Refresh token not available");
        history.push({ pathname: pathName.LOGIN });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
