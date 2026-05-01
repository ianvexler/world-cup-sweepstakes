class Api::V1::StandingsController < ApplicationController
  def index
    standings = football_data_service.get_standings
    render json: standings, status: :ok, each_serializer: StandingSerializer
  end

  private

  def football_data_service
    @football_data_service ||= FootballDataService.new
  end
end