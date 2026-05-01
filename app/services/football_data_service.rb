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
end
