# == Schema Information
#
# Table name: picks
#
#  id                 :bigint           not null, primary key
#  position           :integer
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

  before_validation :assign_default_position, on: :create

  validates :position, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  private

  def assign_default_position
    return unless position.nil?
    return unless user_sweepstake

    self.position = user_sweepstake.picks.maximum(:position).to_i + 1
  end
end
