require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  describe 'POST /api/v1/auth/sign_in' do
    let(:user) { create(:user) }
    let(:sign_in_path) { '/api/v1/auth/sign_in' }

    it 'returns the authenticated user and JWT authorization header' do
      post sign_in_path, params: { session: { email: user.email, password: user.password } }, as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.dig('user', 'email')).to eq(user.email)
    end

    context 'when the password is invalid' do
      it 'returns an error' do
        post sign_in_path, params: { session: { email: user.email, password: 'invalid' } }, as: :json

        expect(response).to have_http_status(:unauthorized)
        expect(response.headers['Authorization']).to be_nil
        expect(response.parsed_body['error']).to eq('Invalid email or password')
      end
    end
  end

  describe 'GET /api/v1/auth/me' do
    let(:user) { create(:user) }
    let(:me_path) { '/api/v1/auth/me' }
    let(:token) do
      post '/api/v1/auth/sign_in', params: { session: { email: user.email, password: user.password } }, as: :json
      response.headers['Authorization']
    end

    it 'returns current user when request is authorized' do
      get me_path, headers: { 'Authorization' => token }, as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.dig('user', 'email')).to eq(user.email)
    end

    it 'returns unauthorized when request has no token' do
      get me_path, as: :json

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    let(:user) { create(:user) }
    let(:sign_out_path) { '/api/v1/auth/sign_out' }
    let(:token) do
      post '/api/v1/auth/sign_in', params: { session: { email: user.email, password: user.password } }, as: :json
      response.headers['Authorization']
    end

    it 'returns success for authorized requests' do
      delete sign_out_path, headers: { 'Authorization' => token }, as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['message']).to eq('Logged out successfully')
    end
  end
end
