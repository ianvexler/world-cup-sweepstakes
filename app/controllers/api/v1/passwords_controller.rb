class Api::V1::PasswordsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :update ]

  def update
    user = User.find_by(email: password_params[:email])

    unless user
      return render json: { error: "No account found with that email" }, status: :not_found
    end

    if user.update(password: password_params[:password], password_confirmation: password_params[:password_confirmation])
      render json: { message: "Password updated successfully" }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def password_params
    params.require(:password_reset).permit(:email, :password, :password_confirmation)
  end
end
