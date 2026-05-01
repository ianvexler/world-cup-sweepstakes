class FootballDataClient
  include HTTParty
  base_uri 'https://api.football-data.org'

  def initialize
    raise ArgumentError, 'FOOTBALL_DATA_API_KEY is not set' if ENV['FOOTBALL_DATA_API_KEY'].blank?

    @headers = {
      'X-Auth-Token' => ENV['FOOTBALL_DATA_API_KEY']
    }
  end

  def get_teams
    response = self.class.get('/v4/competitions/WC/teams', headers: @headers)
    raise StandardError, "football-data request failed with status #{response.code}" unless response.success?

    parse_teams(response)
  end

  private

  def parse_teams(response)
    response['teams'].map do |team|
      {
        id: team['id'],
        name: team['name'],
        crest: team['crest'],
      }
    end
  end
end