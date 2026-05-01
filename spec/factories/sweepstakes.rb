FactoryBot.define do
  factory :sweepstake do
    sequence(:name) { |n| "Sweepstake #{n}" }
    deadline { 1.month.from_now }
    join_code { SecureRandom.hex(4) }
  end
end
