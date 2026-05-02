import apiClient from "../../apiClient";

const assignTeams = async (sweepstakeId: string) => {
  const response = await apiClient.post(`/v1/sweepstakes/${sweepstakeId}/assign_teams`);
  return response.data;
};

export default assignTeams;