import apiClient from "../../apiClient";
import { SweepstakePickAssigned } from "../../../../types";

const getSweepstakePicks = async (sweepstakeId: string): Promise<SweepstakePickAssigned[]> => {
  const response = await apiClient.get<SweepstakePickAssigned[]>(
    `/v1/sweepstakes/${sweepstakeId}/sweepstake_picks`
  );
  return response.data;
};

export default getSweepstakePicks;
