class Api::V1::Sweepstakes::SweepstakePicksController < ApplicationController
  def index
    user_sweepstake = UserSweepstake.find_by(
      user_id: current_user.id,
      sweepstake_id: params[:sweepstake_id]
    )

    if user_sweepstake.nil?
      return render json: { error: "User sweepstake not found" }, status: :not_found
    end

    sweepstake_picks = user_sweepstake.sweepstake_picks.includes(pick: :pick_option).order(:id)

    render json: sweepstake_picks, each_serializer: SweepstakePickSerializer
  end
end
