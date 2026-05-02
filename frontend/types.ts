export type Sweepstake = {
  id: string;
  name: string;
  deadline: string;
  join_code: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type UserPick = {
  id: string;
  position: number;
  pick_option: PickOption;
};

export type PickOption = {
  id: string;
  name: string;
  crest: string;
  football_data_id: number;
};

export type Standing = {
  id: string;
  stage: string;
  type: string;
  group: string;
  table: StandingTable[];
};

export type StandingTable = {
  position: number;
  team: {
    name: string;
    crest: string;
  };
};
