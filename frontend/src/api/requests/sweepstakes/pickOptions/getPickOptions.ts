import apiClient from '../../../apiClient';

const getPickOptions = async (sweepstakeId: string) => {
  const response = await apiClient.get(`/v1/sweepstakes/${sweepstakeId}/pick_options`);
  return response.data;
};

export default getPickOptions;
