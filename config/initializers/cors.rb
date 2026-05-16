# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  production_origins = ENV.fetch("CORS_ALLOWED_ORIGINS", "")
    .split(",")
    .map(&:strip)
    .reject(&:empty?)

  # Development origins
  allow do
    origins "http://localhost:5173"

    resource "*",
      headers: :any,
      expose: [ "Authorization" ],
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end

  if production_origins.any?
    allow do
      origins(*production_origins)

      resource "*",
        headers: :any,
        expose: [ "Authorization" ],
        methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
    end
  end
end
