require 'rails_helper'

RSpec.describe Api::V1::PasswordsController, type: :request do
  describe 'PUT /api/v1/auth/password' do
    let(:user) { create(:user) }
    let(:reset_path) { '/api/v1/auth/password' }
    let(:new_password) { 'newpassword123' }

    it 'updates the user password' do
      put reset_path, params: {
        password_reset: {
          email: user.email,
          password: new_password,
          password_confirmation: new_password
        }
      }, as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['message']).to eq('Password updated successfully')
      expect(user.reload.valid_password?(new_password)).to be(true)
    end

    context 'when the email is not found' do
      it 'returns not found' do
        put reset_path, params: {
          password_reset: {
            email: 'missing@example.com',
            password: new_password,
            password_confirmation: new_password
          }
        }, as: :json

        expect(response).to have_http_status(:not_found)
        expect(response.parsed_body['error']).to eq('No account found with that email')
      end
    end

    context 'when passwords do not match' do
      it 'returns validation errors' do
        put reset_path, params: {
          password_reset: {
            email: user.email,
            password: new_password,
            password_confirmation: 'differentpassword'
          }
        }, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.parsed_body['errors']).to be_present
      end
    end
  end
end
