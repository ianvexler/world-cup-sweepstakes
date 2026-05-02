class FootballDataService
  def initialize(client: FootballDataClient.new)
    @client = client
  end

  def get_teams(sweepstake_id, refresh: false)
    @sweepstake_id = sweepstake_id

    pick_options_scope = PickOption.where(sweepstake_id: @sweepstake_id)
    return pick_options_scope unless refresh || pick_options_scope.empty?

    teams = @client.get_teams
    ActiveRecord::Base.transaction do
      teams.each do |team|
        pick_option = pick_options_scope.find_or_initialize_by(football_data_id: team[:id])
        pick_option.name = team[:name]
        pick_option.crest = team[:crest]
        pick_option.save!
      end
    end

    pick_options_scope
  end

  def get_standings(refresh: false)
    standings_scope = Standing.all
    return standings_scope unless refresh || standings_scope.empty?

    standings = @client.get_standings
    ActiveRecord::Base.transaction do
      standings.each do |standing_data|
        standing_record = standings_scope.find_or_initialize_by(
          stage: standing_data[:stage],
          group: standing_data[:group]
        )

        standing_record.table = standing_data[:table]
        standing_record.save!
      end
    end

    standings_scope
  end

  def get_matches(refresh: false)
    matches_scope = Match.all
    return matches_scope unless refresh || matches_scope.empty?

    matches = @client.get_matches
    ActiveRecord::Base.transaction do
      matches.each do |match_data|
        match_record = matches_scope.find_or_initialize_by(football_data_id: match_data[:id])
        match_record.start_time = match_data[:start_time]
        match_record.matchday = match_data[:matchday]
        match_record.stage = match_data[:stage]
        match_record.group = match_data[:group]
        match_record.last_updated = match_data[:last_updated]
        
        match_record.home_team = match_data[:home_team]
        match_record.away_team = match_data[:away_team]
        match_record.score = match_data[:score]
        match_record.save!
      end
    end

    matches_scope
  end
end
