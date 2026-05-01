# == Schema Information
#
# Table name: pick_options
#
#  id               :bigint           not null, primary key
#  crest            :string
#  name             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  football_data_id :integer
#  sweepstake_id    :bigint           not null
#
# Indexes
#
#  index_pick_options_on_sweepstake_id  (sweepstake_id)
#
# Foreign Keys
#
#  fk_rails_...  (sweepstake_id => sweepstakes.id)
#
class PickOption < ApplicationRecord
  has_many :picks, dependent: :destroy
  belongs_to :sweepstake

  validates :football_data_id, uniqueness: { scope: :sweepstake_id }, allow_nil: true
end
