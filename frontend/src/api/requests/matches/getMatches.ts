import apiClient from '../../apiClient';

const getMatches = async () => {
  const response = await apiClient.get('/v1/matches');
  return response.data;
};

export default getMatches;
