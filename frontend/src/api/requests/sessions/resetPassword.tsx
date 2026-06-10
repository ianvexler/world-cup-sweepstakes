import apiClient from '../../apiClient';

export const resetPassword = async (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await apiClient.put('/v1/auth/password', {
    password_reset: {
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });

  return response.data;
};
