import apiClient from '../../apiClient';
import { Sweepstake, SweepstakeStatus } from '../../../types';

const updateSweepstakeStatus = async (id: string, status: SweepstakeStatus) => {
  const response = await apiClient.patch<Sweepstake>(`/v1/sweepstakes/${id}`, { status });
  return response.data;
};

export default updateSweepstakeStatus;
