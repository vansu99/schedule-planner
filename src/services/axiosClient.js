import axios from 'axios';
import queryString from 'query-string';

import history from 'helpers/history';
import { pathName, StorageKeys } from 'configs';
import { localStorageService } from 'hooks/useLocalStorage';

const { getRefreshToken } = localStorageService;
const API_URL = 'https://projectfinaltodo.herokuapp.com';
// https://projectfinaltodo.herokuapp.com
// http://localhost:8080

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 3 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },

  paramsSerializer: (params) => queryString.stringify(params),
});

// Request Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const config = response.config;
    const { code, msg } = response.data;
    if (code && code === 401) {
      // xu ly token het han
      if (msg && msg === 'jwt expired') {
        // step 1: get token from refresh token
        const { accessToken } = await forceRenewToken();
        // step 2: update header
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          // step 3: set token into local storage and request again
          localStorage.setItem(StorageKeys.TOKEN, accessToken);
          return axiosClient(config);
        }
      }
    }

    return response;
  },
  (error) => {
    if (error.response) {
      // const origionalRequest = error.config;
      if (error.response.status === 401 || error.response.status === 500) {
        // logout
        history.push({ pathname: '/login' });
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
    .post('/api/auth/refresh', { refresh: refreshToken })
    .then((res) => {
      // save token new and update header
      axiosClient.defaults.headers['Authorization'] = `Bearer ${res.data.refToken}`;
      localStorage.setItem(StorageKeys.TOKEN, res.data.refToken);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export default axiosClient;
