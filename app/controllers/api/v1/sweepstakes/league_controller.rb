class Api::V1::Sweepstakes::LeagueController < ApplicationController
  def index
    sweepstake = Sweepstake.find(params[:sweepstake_id])
    if sweepstake.nil?
      return render json: { error: "Sweepstake not found" }, status: :not_found
    end

    users = sweepstake.users
    
    users_data = []
    users.each do |user|
      user_sweepstake = UserSweepstake
        .includes(:user, :sweepstake)
        .find_by(user: user, sweepstake: sweepstake)

      users_data << LeagueUserSerializer.new(user_sweepstake).as_json
    end

    render json: { users: users_data }, status: :ok
  end
end