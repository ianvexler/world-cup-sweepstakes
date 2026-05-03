import apiClient from '../../apiClient';

const getLeague = async (sweepstakeId: string) => {
  const response = await apiClient.get(`/v1/sweepstakes/${sweepstakeId}/league`);
  return response.data;
};

export default getLeague;
