class AddMatchdayToStandings < ActiveRecord::Migration[8.0]
  def change
    add_column :standings, :matchday, :integer, default: 0, null: false
  end
end
