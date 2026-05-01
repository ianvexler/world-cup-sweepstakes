# == Schema Information
#
# Table name: picks
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  pick_option_id     :bigint           not null
#  user_sweepstake_id :bigint           not null
#
# Indexes
#
#  index_picks_on_pick_option_id      (pick_option_id)
#  index_picks_on_user_sweepstake_id  (user_sweepstake_id)
#
# Foreign Keys
#
#  fk_rails_...  (pick_option_id => pick_options.id)
#  fk_rails_...  (user_sweepstake_id => user_sweepstakes.id)
#
class Pick < ApplicationRecord
  belongs_to :user_sweepstake
  belongs_to :pick_option
end
