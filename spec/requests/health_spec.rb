require 'rails_helper'

RSpec.describe 'Health', type: :request do
  describe 'GET /' do
    it 'returns a successful response' do
      get '/'
      puts "env=#{Rails.env}"
      puts "hosts=#{Rails.application.config.hosts.inspect}"

      expect(response).to be_successful
    end
  end
end
