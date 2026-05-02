export type Sweepstake = {
  id: string;
  name: string;
  deadline: string;
  join_code: string;
  status: SweepstakeStatus;
  created_at: string;
  updated_at: string;
  assigned_teams: boolean;
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

export const sweepstakeStatuses = [
  'draft', 
  'started', 
  'completed'
] as const;

export type SweepstakeStatus = (typeof sweepstakeStatuses)[number];

export type Match = {
  id: string;
  start_time: string;
  matchday: number;
  stage: string;
  group: string;
  last_updated: string;
  home_team: {
    name: string;
    shortName: string;
    crest: string;
  };
  away_team: {
    name: string;
    shortName: string;
    crest: string;
  };
  score: {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
};

export type LeagueUser = {
  id: string;
  name: string;
  points: number;
};

export type SweepstakePickAssigned = {
  id: string;
  pick_option: PickOption;
};