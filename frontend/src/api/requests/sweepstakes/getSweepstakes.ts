import apiClient from '../../apiClient';

const getSweepstakes = async () => {
  const response = await apiClient.get('/v1/sweepstakes');
  return response.data;
};

export default getSweepstakes;
