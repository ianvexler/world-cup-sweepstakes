class PickSerializer < ActiveModel::Serializer
  attributes :id, :position

  belongs_to :pick_option
end