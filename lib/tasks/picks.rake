namespace :picks do
  desc "Create default pick rankings for users who have no picks (mirrors API prepare_picks)"
  task seed_missing: :environment do
    users = User.where.missing(:picks)
    user_total = users.count
    sweepstakes_prepared = 0

    users.find_each do |user|
      user.user_sweepstakes.each do |user_sweepstake|
        next if user_sweepstake.picks.exists?

        sweepstake_id = user_sweepstake.sweepstake_id
        pick_options = FootballDataService.new.get_teams(sweepstake_id).order(:id)

        ActiveRecord::Base.transaction do
          pick_options.each_with_index do |pick_option, index|
            pick = Pick.find_or_initialize_by(user_sweepstake: user_sweepstake, pick_option: pick_option)
            pick.position = index + 1
            pick.save!
          end
        end

        sweepstakes_prepared += 1
      end
    end

    puts "Prepared picks for #{sweepstakes_prepared} user sweepstake(s) covering #{user_total} user(s) with no picks."
  end
end
