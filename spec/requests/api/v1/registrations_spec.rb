require "rails_helper"

RSpec.describe "Api::V1::Registrations", type: :request do
  describe "POST /api/v1/auth/sign_up" do
    let(:sign_up_path) { "/api/v1/auth/sign_up" }
    let!(:sweepstake) { create(:sweepstake, join_code: "abc12345") }

    def sign_up_params(email:, password:, join_code: sweepstake.join_code)
      {
        registration: {
          email: email,
          password: password,
          password_confirmation: password,
          join_code: join_code
        }
      }
    end

    it "creates a user, membership, and returns JWT" do
      expect {
        post sign_up_path,
             params: sign_up_params(email: "friend@example.com", password: "a-long-valid-password"),
             as: :json
      }.to change(User, :count).by(1)
        .and change(UserSweepstake, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(response.parsed_body.dig("user", "email")).to eq("friend@example.com")
      expect(response.headers["Authorization"]).to be_present

      membership = UserSweepstake.last
      expect(membership.user.email).to eq("friend@example.com")
      expect(membership.sweepstake).to eq(sweepstake)
      expect(membership.is_owner).to be(false)
    end

    context "when join code is wrong" do
      it "returns unprocessable entity" do
        post sign_up_path,
             params: sign_up_params(email: "x@example.com", password: "a-long-valid-password", join_code: "wrong"),
             as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.parsed_body["error"]).to eq("Invalid join code")
      end
    end

    context "when email is already taken" do
      let!(:existing) { create(:user, email: "taken@example.com") }

      it "returns validation errors" do
        post sign_up_path,
             params: sign_up_params(email: "taken@example.com", password: "a-long-valid-password"),
             as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.parsed_body["errors"]).to be_present
      end
    end
  end
end
