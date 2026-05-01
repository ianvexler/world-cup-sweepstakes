# == Schema Information
#
# Table name: standings
#
#  id         :bigint           not null, primary key
#  group      :string
#  stage      :string
#  table      :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class StandingSerializer < ActiveModel::Serializer
  attributes :id, :stage, :group, :table
end
