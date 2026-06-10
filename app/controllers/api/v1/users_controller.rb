class Api::V1::UsersController < ApplicationController
  before_action :require_admin!

  def index
    users = User.order(:email)
    render json: users, each_serializer: AdminUserSerializer, status: :ok
  end

  private

  def require_admin!
    return if current_user.is_admin?

    render json: { error: "Forbidden" }, status: :forbidden
  end
end
