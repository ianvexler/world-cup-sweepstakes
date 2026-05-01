puts 'Creating users...'

users_data = [
  { email: 'user@example.com', password: 'password' }
]

users = users_data.map do |user_data|
  user = User.find_or_initialize_by(email: user_data[:email])
  user.password = user_data[:password]
  user.save!
  user
end

puts "#{users.count} Users created successfully"

puts 'Creating sweepstakes...'

sweepstakes_data = [
  { name: 'World Cup 2026', owner: users.first, deadline: Date.new(2026, 12, 18) }
]

sweepstakes = sweepstakes_data.map do |sweepstake_data|
  sweepstake = Sweepstake.find_or_initialize_by(name: sweepstake_data[:name])
  sweepstake.deadline = sweepstake_data[:deadline]
  sweepstake.join_code = "wc2026" if sweepstake.new_record?
  sweepstake.save!
  sweepstake

  UserSweepstake.create!(user: users.first, sweepstake: sweepstake, is_owner: true)
end

puts "#{sweepstakes.count} Sweepstakes created successfully"
