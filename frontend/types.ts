export type Sweepstake = {
  id: string;
  name: string;
  deadline: string;
  join_code: string;
  status: string;
};

export type PickOption = {
  id: string;
  name: string;
  crest: string;
  football_data_id: number;
};