import apiClient from '../../apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/v1/auth/sign_in', {
    session: {
      email,
      password,
    },
  });

  const authorizationHeader = response.headers.authorization as string | undefined;
  const token = authorizationHeader?.replace(/^Bearer\s+/i, '');
  if (token) {
    localStorage.setItem('auth_token', token);
  }

  return response.data;
};
