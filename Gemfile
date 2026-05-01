source "https://rubygems.org"

gem "active_model_serializers"
gem "rails", "~> 8.0.2"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false
gem "rack-cors"
gem "devise", "~> 5.0"
gem "devise-jwt"
gem "httparty"
gem "rolify"

group :development, :test do
  gem "annotaterb"
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rspec-rails", "~> 8.0.0"
  gem "simplecov", require: false
  gem "factory_bot_rails"
  gem "faker"

  # Pre-configured RuboCop setup
  gem "rubocop-rails-omakase", require: false
end
