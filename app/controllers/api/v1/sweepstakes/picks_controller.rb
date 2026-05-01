class Api::V1::Sweepstakes::PicksController < ApplicationController
  def index
    user_sweepstake = UserSweepstake.find_by(
      user_id: current_user.id,
      sweepstake_id: params[:sweepstake_id]
    )

    if user_sweepstake.nil?
      return render json: { error: "User sweepstake not found" }, status: :not_found
    end

    picks = Pick.where(user_sweepstake: user_sweepstake).order(:position)
    render json: picks, status: :ok, each_serializer: PickSerializer
  end

  def order
    user_sweepstake = UserSweepstake.find_by(
      user_id: current_user.id,
      sweepstake_id: params[:sweepstake_id]
    )

    if user_sweepstake.nil?
      return render json: { error: "User sweepstake not found" }, status: :not_found
    end

    ids = order_params[:pick_option_ids]
    requested = ids.map(&:to_i)
    sweepstake = user_sweepstake.sweepstake

    ActiveRecord::Base.transaction do
      requested.each_with_index do |pick_option_id, index|
        pick = Pick.find_or_initialize_by(
          user_sweepstake: user_sweepstake,
          pick_option_id: pick_option_id
        )
        pick.position = index + 1
        pick.save!
      end
    end

    render json: { ok: true }, status: :ok
  end

  private

  def order_params
    params.permit(pick_option_ids: [])
  end
end
