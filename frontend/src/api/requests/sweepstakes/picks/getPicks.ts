import apiClient from '../../../apiClient';

const getPicks = async (sweepstakeId: string) => {
  const response = await apiClient.get(`/v1/sweepstakes/${sweepstakeId}/picks`);
  return response.data;
};

export default getPicks;
