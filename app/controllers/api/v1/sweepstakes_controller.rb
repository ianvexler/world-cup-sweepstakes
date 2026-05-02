class Api::V1::SweepstakesController < ApplicationController
  def index
    sweepstakes = Sweepstake.for_user(current_user)
    render json: sweepstakes, status: :ok, each_serializer: SweepstakeSerializer
  end

  def update
    sweepstake = Sweepstake.find(params[:id])
    sweepstake.update(status: params[:status])
    render json: sweepstake, status: :ok, serializer: SweepstakeSerializer
  end

  def assign_teams
    sweepstake = Sweepstake.find(params[:id])

    assign_teams_service = AssignTeamsService.new(sweepstake)
    assign_teams_service.call

    sweepstake.update(assigned_teams: true)
    
    render json: { message: "Teams assigned successfully" }, status: :ok
  end
end
