class AddAssignedTeamsToSweepstakes < ActiveRecord::Migration[8.0]
  def change
    add_column :sweepstakes, :assigned_teams, :boolean, default: false, null: false;
  end
end
