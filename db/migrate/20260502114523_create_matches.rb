class CreateMatches < ActiveRecord::Migration[8.0]
  def change
    create_table :matches do |t|
      t.integer :football_data_id, null: false
      t.datetime :start_time, null: false
      t.integer :matchday
      t.string :stage, null: false
      t.string :group
      t.string :last_updated, null: false
      
      t.jsonb :home_team, null: false
      t.jsonb :away_team, null: false
      t.jsonb :score, null: false

      t.timestamps
    end
  end
end
