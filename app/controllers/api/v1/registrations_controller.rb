class Api::V1::RegistrationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :create ]

  def create
    permitted = registration_params
    join_code = permitted[:join_code].to_s.strip
    sweepstake = Sweepstake.find_by(join_code: join_code)

    unless sweepstake
      return render json: { error: "Invalid join code" }, status: :unprocessable_entity
    end

    user = User.new(permitted.except(:join_code))

    begin
      ActiveRecord::Base.transaction do
        user.save!
        UserSweepstake.create!(user: user, sweepstake: sweepstake, is_owner: false)
      end
    rescue ActiveRecord::RecordInvalid => e
      return render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    sign_in(:user, user)

    render json: { user: UserSerializer.new(user) }, status: :created
  end

  private

  def registration_params
    params.require(:registration).permit(:email, :password, :password_confirmation, :join_code)
  end
end
