puts 'Creating users...'

users_data = [
  { email: 'ianvexler@gmail.com', name: 'Ian', password: 'password', is_admin: true }
]

if Rails.env.development?
  users_data.push(
    { email: 'test@example.com', name: 'Test', password: 'password', is_admin: false }
  )
  users_data.push(
    { email: 'test2@example.com', name: 'Test2', password: 'password', is_admin: false }
  )
  users_data.push(
    { email: 'test3@example.com', name: 'Test3', password: 'password', is_admin: false }
  )
  users_data.push(
    { email: 'test4@example.com', name: 'Test4', password: 'password', is_admin: false }
  )
end

users = users_data.map do |user_data|
  user = User.find_or_initialize_by(email: user_data[:email])
  user.password = user_data[:password]
  user.is_admin = user_data[:is_admin]
  user.name = user_data[:name]
  user.save!
  user
end

puts "#{users.count} Users created successfully"

puts 'Creating sweepstakes...'

sweepstakes_data = [
  { name: 'World Cup 2026', owner: users.first, deadline: Date.new(2026, 06, 06) }
]

sweepstakes = sweepstakes_data.map do |sweepstake_data|
  sweepstake = Sweepstake.find_or_initialize_by(name: sweepstake_data[:name])
  sweepstake.deadline = sweepstake_data[:deadline]
  sweepstake.save!
  sweepstake

  for user in users
    UserSweepstake.create!(user: user, sweepstake: sweepstake, is_owner: user == users.first)
  end
end

puts "#{sweepstakes.count} Sweepstakes created successfully"


if Rails.env.development?
  puts 'Seeding matches from mock-matches.json...'

  mock_matches_path = Rails.root.join('mock-matches.json')
  unless mock_matches_path.exist?
    puts "Skipping matches: #{mock_matches_path} not found"
  else
    payload = JSON.parse(File.read(mock_matches_path))
    camelize_keys = lambda do |value|
      case value
      when Hash
        value.transform_keys { |k| k.to_s.underscore.camelize(:lower) }
            .transform_values { |v| camelize_keys.call(v) }
      when Array
        value.map { |v| camelize_keys.call(v) }
      else
        value
      end
    end

    ActiveRecord::Base.transaction do
      payload.fetch('matches').each do |m|
        match = Match.find_or_initialize_by(football_data_id: m['id'])
        match.start_time = m['utcDate']
        match.matchday = m['matchday']
        match.stage = m['stage']
        match.group = m['group']
        match.last_updated = m['lastUpdated'].to_s
        match.home_team = camelize_keys.call(m['homeTeam'])
        match.away_team = camelize_keys.call(m['awayTeam'])
        match.score = camelize_keys.call(m['score'])
        match.save!
      end
    end

    puts "#{payload.fetch('matches').size} Matches seeded successfully"
  end
end
