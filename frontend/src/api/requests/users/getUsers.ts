import apiClient from '../../apiClient';
import { AdminUser } from '../../../../types';

const getUsers = async (): Promise<AdminUser[]> => {
  const response = await apiClient.get('/v1/users');
  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

export default getUsers;
