# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_05_01_234146) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "pick_options", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "sweepstake_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "crest"
    t.integer "football_data_id"
    t.index ["sweepstake_id"], name: "index_pick_options_on_sweepstake_id"
  end

  create_table "picks", force: :cascade do |t|
    t.bigint "user_sweepstake_id", null: false
    t.bigint "pick_option_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.index ["pick_option_id"], name: "index_picks_on_pick_option_id"
    t.index ["user_sweepstake_id"], name: "index_picks_on_user_sweepstake_id"
  end

  create_table "standings", force: :cascade do |t|
    t.string "stage"
    t.string "group"
    t.jsonb "table", default: []
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sweepstakes", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "deadline", null: false
    t.string "join_code", null: false
    t.string "status", default: "draft", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["join_code"], name: "index_sweepstakes_on_join_code", unique: true
  end

  create_table "user_sweepstakes", force: :cascade do |t|
    t.string "status", default: "pending", null: false
    t.boolean "is_owner", default: false, null: false
    t.boolean "is_admin", default: false, null: false
    t.bigint "user_id", null: false
    t.bigint "sweepstake_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sweepstake_id"], name: "index_user_sweepstakes_on_sweepstake_id"
    t.index ["user_id"], name: "index_user_sweepstakes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_admin", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "pick_options", "sweepstakes"
  add_foreign_key "picks", "pick_options"
  add_foreign_key "picks", "user_sweepstakes"
  add_foreign_key "user_sweepstakes", "sweepstakes"
  add_foreign_key "user_sweepstakes", "users"
end
