import apiClient from '../../../apiClient';

const syncPickOrder = async (sweepstakeId: string, pickOptionIds: string[]) => {
  await apiClient.put(`/v1/sweepstakes/${sweepstakeId}/picks/order`, {
    pick_option_ids: pickOptionIds,
  });
};

export default syncPickOrder;
