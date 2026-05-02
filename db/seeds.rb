puts 'Creating users...'

users_data = [
  { email: 'ianvexler@gmail.com', name: 'Ian', password: ENV['ADMIN_PASSWORD'], is_admin: true }
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
