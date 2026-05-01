import apiClient from '../../apiClient';

export const register = async (
  email: string,
  password: string,
  passwordConfirmation: string,
  joinCode: string
) => {
  const response = await apiClient.post('/v1/auth/sign_up', {
    registration: {
      email,
      password,
      password_confirmation: passwordConfirmation,
      join_code: joinCode,
    },
  });

  const authorizationHeader = response.headers.authorization as string | undefined;
  const token = authorizationHeader?.replace(/^Bearer\s+/i, '');
  if (token) {
    localStorage.setItem('auth_token', token);
  }

  return response.data;
};
