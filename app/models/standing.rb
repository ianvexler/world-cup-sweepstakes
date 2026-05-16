
# == Schema Information
#
# Table name: standings
#
#  id         :bigint           not null, primary key
#  group      :string
#  matchday   :integer          default(0), not null
#  stage      :string
#  table      :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Standing < ApplicationRecord
end
