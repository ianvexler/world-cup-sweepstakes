import axios from 'axios';
import { applyAccessTokenToRequest } from './interceptors/requests/applyAccessTokenToRequest';
import { onUnauthenticatedResponse } from './interceptors/response/onUnauthenticatedRespnose';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(applyAccessTokenToRequest, Promise.reject);
apiClient.interceptors.response.use((response) => response, onUnauthenticatedResponse);

export default apiClient;
