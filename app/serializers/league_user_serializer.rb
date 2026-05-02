class LeagueUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :points

  def id
    object.user.id
  end

  def name
    object.user.name
  end
end