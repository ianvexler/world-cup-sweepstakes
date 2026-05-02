class AssignTeamsService
  def initialize(sweepstake)
    @sweepstake = sweepstake
  end

  def call
    user_sweepstakes = @sweepstake.user_sweepstakes.includes(picks: :pick_option).to_a
    return if user_sweepstakes.empty?

    available_options = @sweepstake.pick_options.to_a

    while available_options.count >= user_sweepstakes.count
      users_this_round = user_sweepstakes.shuffle

      users_this_round.each do |user_sweepstake|
        user_picks = user_sweepstake.picks.sort_by { |pick| [pick.position, pick.id] }
        selected_pick = top_available_pick(user_picks, available_options, user_sweepstake.id)

        available_options.delete(selected_pick.pick_option)
        SweepstakePick.create!(user_sweepstake: user_sweepstake, pick: selected_pick)
      end
    end
  end

  private

  def top_available_pick(user_picks, available_options, user_sweepstake_id)
    user_picks.each do |user_pick|
      return user_pick if available_options.include?(user_pick.pick_option)
    end

    raise "No available pick found for user_sweepstake_id=#{user_sweepstake_id}"
  end
end