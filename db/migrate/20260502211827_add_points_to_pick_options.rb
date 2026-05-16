class AddPointsToPickOptions < ActiveRecord::Migration[8.0]
  def change
    add_column :pick_options, :points, :integer, default: 0, null: false
  end
end
