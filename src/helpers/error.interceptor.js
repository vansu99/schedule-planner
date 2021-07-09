import axios from 'axios';

export function errorInterceptor() {
  axios.interceptors.response.use(null, error => {
    const { response } = error;
    if (!response) {
      // network error
      console.error(error);
      return;
    }

    if ([401, 403].includes(response.status)) {
    }

    const errorMessage = response.data?.message || response.statusText;
    return errorMessage;
  });
}
