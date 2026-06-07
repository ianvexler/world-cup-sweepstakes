import apiClient from '../../apiClient';
import { Sweepstake, SweepstakeStatus } from '../../../types';

type UpdateSweepstakeParams = {
  status?: SweepstakeStatus;
  deadline?: string;
};

const updateSweepstake = async (id: string, params: UpdateSweepstakeParams) => {
  const response = await apiClient.patch<Sweepstake>(`/v1/sweepstakes/${id}`, params);
  return response.data;
};

export default updateSweepstake;
