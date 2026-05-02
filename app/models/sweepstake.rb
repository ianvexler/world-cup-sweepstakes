# == Schema Information
#
# Table name: sweepstakes
#
#  id         :bigint           not null, primary key
#  deadline   :datetime         not null
#  join_code  :string           not null
#  name       :string           not null
#  status     :string           default("draft"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_sweepstakes_on_join_code  (join_code) UNIQUE
#
class Sweepstake < ApplicationRecord
  has_many :picks, through: :user_sweepstakes
  has_many :pick_options, dependent: :destroy
  has_many :user_sweepstakes, dependent: :destroy
  has_many :users, through: :user_sweepstakes
  has_many :picks, through: :user_sweepstakes

  before_create :generate_join_code

  scope :for_user, ->(user) { joins(:user_sweepstakes).where(user_sweepstakes: { user: user }) }

  enum :status, {
    draft: "draft",
    started: "started",
    completed: "completed"
  }

  private

  def generate_join_code
    self.join_code ||= SecureRandom.hex(4)
  end
end
