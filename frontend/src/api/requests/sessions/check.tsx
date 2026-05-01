import apiClient from '../../apiClient';

export const check = async () => {
  const response = await apiClient.get('/v1/auth/me');
  return response.data;
};
