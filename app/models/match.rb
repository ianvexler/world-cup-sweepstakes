# == Schema Information
#
# Table name: matches
#
#  id               :bigint           not null, primary key
#  away_team        :jsonb            not null
#  group            :string
#  home_team        :jsonb            not null
#  last_updated     :string           not null
#  matchday         :integer
#  score            :jsonb            not null
#  stage            :string           not null
#  start_time       :datetime         not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  football_data_id :integer          not null
#
class Match < ApplicationRecord
end
