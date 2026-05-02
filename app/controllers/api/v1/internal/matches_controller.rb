class Api::V1::Internal::MatchesController < Api::V1::Internal::AuthenticatedController
  def sync
    football_data_service = FootballDataService.new
    football_data_service.get_matches(refresh: true)

    render json: { message: "Matches synced successfully" }, status: :ok
  end
end