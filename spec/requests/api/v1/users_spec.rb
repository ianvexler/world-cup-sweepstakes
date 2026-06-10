require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  let(:admin) { create(:user, is_admin: true) }
  let(:user) { create(:user) }
  let(:users_path) { '/api/v1/users' }

  def auth_headers(for_user)
    post '/api/v1/auth/sign_in', params: { session: { email: for_user.email, password: for_user.password } }, as: :json
    { 'Authorization' => response.headers['Authorization'] }
  end

  describe 'GET /api/v1/users' do
    it 'returns all users for admins' do
      admin
      user

      get users_path, headers: auth_headers(admin), as: :json

      expect(response).to have_http_status(:ok)
      emails = response.parsed_body.map { |u| u['email'] }
      expect(emails).to include(admin.email, user.email)
    end

    it 'returns forbidden for non-admins' do
      get users_path, headers: auth_headers(user), as: :json

      expect(response).to have_http_status(:forbidden)
    end
  end
end
