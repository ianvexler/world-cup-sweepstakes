class Api::V1::Internal::AuthenticatedController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :authenticate_internal_request!

  private

  def authenticate_internal_request!
    expected = ENV["INTERNAL_API_TOKEN"].to_s.strip
    provided = request.headers["X-Auth-Token"].to_s.strip

    unless ActiveSupport::SecurityUtils.secure_compare(provided, expected)
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end