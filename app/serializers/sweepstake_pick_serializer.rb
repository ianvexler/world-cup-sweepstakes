# == Schema Information
#
# Table name: sweepstake_picks
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  pick_id            :bigint           not null
#  user_sweepstake_id :bigint           not null
#
# Indexes
#
#  index_sweepstake_picks_on_pick_id             (pick_id)
#  index_sweepstake_picks_on_user_sweepstake_id  (user_sweepstake_id)
#
# Foreign Keys
#
#  fk_rails_...  (pick_id => picks.id)
#  fk_rails_...  (user_sweepstake_id => user_sweepstakes.id)
#
class SweepstakePickSerializer < ActiveModel::Serializer
  attributes :id

  attribute :pick_option do
    PickOptionSerializer.new(object.pick.pick_option).as_json
  end
end
