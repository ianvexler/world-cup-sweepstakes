class Api::V1::Sweepstakes::PickOptionsController < ApplicationController
  def index
    sweepstake = Sweepstake.find(params[:sweepstake_id])

    football_data_service = FootballDataService.new(sweepstake.id)
    pick_options = football_data_service.get_teams

    render json: pick_options, status: :ok, each_serializer: PickOptionSerializer
  end

  private

  def pick_params
    params.require(:pick).permit(:user_id, :pick_option_id)
  end
end