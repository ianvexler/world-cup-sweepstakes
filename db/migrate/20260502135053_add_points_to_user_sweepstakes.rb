class AddPointsToUserSweepstakes < ActiveRecord::Migration[8.0]
  def change
    add_column :user_sweepstakes, :points, :integer, default: 0, null: false
  end
end
