Rails.application.configure do
  if Rails.env.development?
    config.hosts << 'set-grouper-externally.ngrok-free.app'
    config.hosts << 'api:3000'
  end
end