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
class PickOptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :crest, :football_data_id
end
