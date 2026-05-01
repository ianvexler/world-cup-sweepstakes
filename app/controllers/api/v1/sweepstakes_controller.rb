class Api::V1::SweepstakesController < ApplicationController
  def index
    sweepstakes = Sweepstake.for_user(current_user)
    render json: sweepstakes, status: :ok, each_serializer: SweepstakeSerializer
  end
end
