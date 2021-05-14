import { StorageKeys } from "configs";

function setAccessToken(tokenObj) {
  localStorage.setItem(StorageKeys.TOKEN, tokenObj.accessToken);
}

function setRefreshToken(tokenObj) {
  localStorage.setItem(StorageKeys.REFRESH_TOKEN, tokenObj.refreshToken);
}

function setTokens(tokenObj) {
  setRefreshToken(tokenObj);
  setAccessToken(tokenObj);
}

function getAccessToken() {
  return localStorage.getItem(StorageKeys.TOKEN);
}

function getRefreshToken() {
  return localStorage.getItem(StorageKeys.REFRESH_TOKEN);
}

function clearTokens() {
  localStorage.removeItem(StorageKeys.TOKEN);
  localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
}

export const localStorageService = {
  setAccessToken,
  setRefreshToken,
  setTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens
};

const useLocalStorage = () => {
  return [localStorageService];
};

export default useLocalStorage;
