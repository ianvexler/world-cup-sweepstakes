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
FactoryBot.define do
  factory :sweepstake do
    sequence(:name) { |n| "Sweepstake #{n}" }
    deadline { 1.month.from_now }
    join_code { SecureRandom.hex(4) }
  end
end
