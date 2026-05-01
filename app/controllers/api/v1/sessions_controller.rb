class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :create ]

  def create
    user = User.find_for_authentication(email: sign_in_params[:email])

    if user&.valid_password?(sign_in_params[:password])
      sign_in(:user, user)

      render json: { user: UserSerializer.new(user) }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    sign_out(:user)
    render json: { message: "Logged out successfully" }, status: :ok
  end

  def show
    render json: {
      user: UserSerializer.new(current_user).as_json
    }, status: :ok
  end

  private

  def sign_in_params
    params.require(:session).permit(:email, :password)
  end
end
