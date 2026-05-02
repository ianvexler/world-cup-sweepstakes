class FootballDataClient
  include HTTParty
  base_uri "https://api.football-data.org"

  def initialize
    raise ArgumentError, "FOOTBALL_DATA_API_KEY is not set" if ENV["FOOTBALL_DATA_API_KEY"].blank?

    @headers = {
      "X-Auth-Token" => ENV["FOOTBALL_DATA_API_KEY"]
    }
    @wc_id = 2000
  end

  def get_teams
    response = self.class.get("/v4/competitions/WC/teams", headers: @headers)
    raise StandardError, "football-data request failed with status #{response.code}" unless response.success?

    parse_teams(response)
  end

  def get_standings
    # WC has id 2000
    response = self.class.get("/v4/competitions/#{@wc_id}/standings", headers: @headers)
    raise StandardError, "football-data request failed with status #{response.code}" unless response.success?

    parse_standings(response)
  end

  def get_matches
    response = self.class.get("/v4/competitions/#{@wc_id}/matches", headers: @headers)
    raise StandardError, "football-data request failed with status #{response.code}" unless response.success?

    parse_matches(response)
  end

  private

  def parse_teams(response)
    response["teams"].map do |team|
      {
        id: team["id"],
        name: team["name"],
        crest: team["crest"]
      }
    end
  end

  def parse_standings(response)
    response["standings"].map do |standing|
      {
        stage: standing["stage"],
        group: standing["group"],
        table: standing["table"]
      }
    end
  end

  def parse_matches(response)
    response["matches"].map do |match|
      {
        id: match["id"],
        start_time: match["utcDate"],
        matchday: match["matchday"],
        stage: match["stage"],
        group: match["group"],
        last_updated: match["lastUpdated"],
        home_team: camelize_keys(match["homeTeam"]),
        away_team: camelize_keys(match["awayTeam"]),
        score: camelize_keys(match["score"])
      }
    end
  end

  def camelize_keys(value)
    case value
    when Hash
      value.transform_keys { |k| k.to_s.underscore.camelize(:lower) }
           .transform_values { |v| camelize_keys(v) }
    when Array
      value.map { |v| camelize_keys(v) }
    else
      value
    end
  end
end
