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
end
