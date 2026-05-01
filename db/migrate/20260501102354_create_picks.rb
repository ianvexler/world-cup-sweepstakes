class CreatePicks < ActiveRecord::Migration[8.0]
  def change
    create_table :picks do |t|
      t.references :user_sweepstake, null: false, foreign_key: true
      t.references :pick_option, null: false, foreign_key: true

      t.timestamps
    end
  end
end
