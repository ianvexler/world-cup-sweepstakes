class MatchSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :matchday, :stage, :group, :last_updated, :home_team, :away_team, :score
end