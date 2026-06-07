class Api::V1::SweepstakesController < ApplicationController
  before_action :require_admin!, only: [ :update, :assign_teams ]

  def index
    sweepstakes = Sweepstake.for_user(current_user)
    render json: sweepstakes, status: :ok, each_serializer: SweepstakeSerializer
  end

  def update
    sweepstake = Sweepstake.find(params[:id])
    sweepstake.update!(sweepstake_params)
    render json: sweepstake, status: :ok, serializer: SweepstakeSerializer
  end

  def assign_teams
    sweepstake = Sweepstake.find(params[:id])

    assign_teams_service = AssignTeamsService.new(sweepstake)
    assign_teams_service.call

    sweepstake.update(assigned_teams: true)

    render json: { message: "Teams assigned successfully" }, status: :ok
  end

  private

  def sweepstake_params
    params.permit(:status, :deadline)
  end

  def require_admin!
    return if current_user.is_admin?

    render json: { error: "Forbidden" }, status: :forbidden
  end
end
