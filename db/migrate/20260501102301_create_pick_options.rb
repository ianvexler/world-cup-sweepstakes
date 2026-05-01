class CreatePickOptions < ActiveRecord::Migration[8.0]
  def change
    create_table :pick_options do |t|
      t.string :name, null: false
      t.references :sweepstake, null: false, foreign_key: true

      t.timestamps
    end
  end
end
