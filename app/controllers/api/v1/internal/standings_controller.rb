class Api::V1::Internal::StandingsController < Api::V1::Internal::AuthenticatedController
  def index
    standings = Standing.all

    football_data_service = FootballDataService.new
    football_data_service.get_standings(refresh: false)
    
    render json: { message: "Matches synced successfully" }, status: :ok
  end
end