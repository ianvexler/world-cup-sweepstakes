class CreateSweepstakes < ActiveRecord::Migration[8.0]
  def change
    create_table :sweepstakes do |t|
      t.string :name, null: false
      t.datetime :deadline, null: false
      t.string :join_code, null: false
      t.string :status, null: false, default: "draft"

      t.timestamps
    end

    add_index :sweepstakes, :join_code, unique: true
  end
end
