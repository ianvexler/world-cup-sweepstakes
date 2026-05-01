class CreateStandings < ActiveRecord::Migration[8.0]
  def change
    create_table :standings do |t|
      t.string :stage
      t.string :group
      t.jsonb :table, default: []

      t.timestamps
    end
  end
end
