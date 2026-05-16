class LeagueUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :points, :picks

  def id
    object.user.id
  end

  def name
    object.user.name
  end

  def picks
    object.sweepstake_picks.map do |sweepstake_pick|
      pick_option = sweepstake_pick.pick_option
      {
        team: pick_option.name,
        crest: pick_option.crest
      }
    end
  end
end
