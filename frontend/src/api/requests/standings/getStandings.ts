import apiClient from '../../apiClient';

const getStandings = async () => {
  const response = await apiClient.get('/v1/standings');
  return response.data;
};

export default getStandings;
