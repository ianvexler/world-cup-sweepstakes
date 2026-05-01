class FootballDataService
  def initialize(sweepstake_id, client: FootballDataClient.new)
    @client = client
    @sweepstake_id = sweepstake_id
  end

  def get_teams(refresh: false)
    existing_pick_options = pick_options_scope
    return existing_pick_options unless refresh || existing_pick_options.empty?

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

  private

  def pick_options_scope
    PickOption.where(sweepstake_id: @sweepstake_id)
  end
end