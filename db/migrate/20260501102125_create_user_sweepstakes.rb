class CreateUserSweepstakes < ActiveRecord::Migration[8.0]
  def change
    create_table :user_sweepstakes do |t|
      t.string :status, null: false, default: "pending"
      t.boolean :is_owner, null: false, default: false
      t.boolean :is_admin, null: false, default: false

      t.references :user, null: false, foreign_key: true
      t.references :sweepstake, null: false, foreign_key: true

      t.timestamps
    end
  end
end
