class AddPositionToPicks < ActiveRecord::Migration[8.0]
  def change
    add_column :picks, :position, :integer
  end
end
