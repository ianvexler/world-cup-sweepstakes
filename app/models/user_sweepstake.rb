# == Schema Information
#
# Table name: user_sweepstakes
#
#  id            :bigint           not null, primary key
#  is_admin      :boolean          default(FALSE), not null
#  is_owner      :boolean          default(FALSE), not null
#  status        :string           default("pending"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  sweepstake_id :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_user_sweepstakes_on_sweepstake_id  (sweepstake_id)
#  index_user_sweepstakes_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (sweepstake_id => sweepstakes.id)
#  fk_rails_...  (user_id => users.id)
#
class UserSweepstake < ApplicationRecord
  resourcify

  belongs_to :user
  belongs_to :sweepstake
end
