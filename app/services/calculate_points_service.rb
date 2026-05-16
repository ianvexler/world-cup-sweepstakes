class CalculatePointsService
  MATCHES_PER_GROUP = 12

  def call
    ActiveRecord::Base.transaction do
      Sweepstake.find_each do |sweepstake|
        calculate_for_sweepstake(sweepstake)
      end
    end
  end

  private

  def calculate_for_sweepstake(sweepstake)
    sweepstake.pick_options.update_all(points: 0)
    pick_options_by_team_id = sweepstake.pick_options.index_by(&:football_data_id)

    Match.find_each do |match|
      calculate_match_points(match, pick_options_by_team_id)
    end

    Standing.find_each do |standing|
      calculate_league_phase_points(standing, pick_options_by_team_id)
    end

    pick_options_by_team_id.each_value(&:save!)
    assign_points_to_users(sweepstake)
  end

  def calculate_match_points(match, pick_options_by_team_id)
    match_winner = match.score["winner"]
    return if match_winner.nil?

    home_team = match.home_team
    away_team = match.away_team

    home_option = pick_options_by_team_id[home_team["id"]]
    away_option = pick_options_by_team_id[away_team["id"]]
    return if home_option.nil? || away_option.nil?

    if match_winner == "HOME_TEAM"
      home_option.points += 3
      home_option.points += calculate_stage_bonus_points(match)
    elsif match_winner == "AWAY_TEAM"
      away_option.points += 3
      away_option.points += calculate_stage_bonus_points(match)
    elsif match_winner == "DRAW"
      home_option.points += 1
      away_option.points += 1
    else
      raise "Invalid match winner: #{match_winner}"
    end
  end

  def calculate_league_phase_points(standing, pick_options_by_team_id)
    return if standing.matchday <= 3

    table = standing.table

    total_matches_finished = table.sum { |team| team["playedGames"].to_i }
    return unless total_matches_finished == MATCHES_PER_GROUP

    table.each do |team_data|
      position = team_data["position"]

      points_bonus = case position
      when 1 then 5
      when 2 then 1
      else 0
      end

      next if points_bonus.zero?

      team_id = team_data.dig("team", "id")
      team = pick_options_by_team_id[team_id]
      next if team.nil?

      team.points += points_bonus
    end
  end

  def calculate_stage_bonus_points(match)
    case match.stage
    when "SEMI_FINALS"
      3
    when "THIRD_PLACE"
      1
    when "FINAL"
      5
    else
      0
    end
  end

  def assign_points_to_users(sweepstake)
    user_sweepstakes = sweepstake.user_sweepstakes.includes(sweepstake_picks: { pick: :pick_option })

    user_sweepstakes.each do |user_sweepstake|
      user_points = user_sweepstake.sweepstake_picks.sum { |sweepstake_pick| sweepstake_pick.pick_option.points }
      user_sweepstake.update!(points: user_points)
    end
  end
end
