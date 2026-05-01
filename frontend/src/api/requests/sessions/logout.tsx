import apiClient from '../../apiClient';

export const logout = async () => {
  const response = await apiClient.delete('/v1/auth/sign_out');
  localStorage.removeItem('auth_token');

  return response.data;
};
