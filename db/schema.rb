# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161130091517) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assets", force: :cascade do |t|
    t.string   "name"
    t.string   "investment_type"
    t.float    "price",           default: 0.0
    t.float    "owned",           default: 0.0
    t.float    "value",           default: 0.0
    t.float    "yield",           default: 0.0
    t.string   "rating"
    t.float    "income",          default: 0.0
    t.float    "debt",            default: 0.0
    t.float    "gains",           default: 0.0
    t.string   "image"
    t.string   "address"
    t.string   "market_type"
    t.string   "property_type"
    t.string   "gps"
    t.integer  "user_owned"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "event_logs", force: :cascade do |t|
    t.integer  "severity",   null: false
    t.string   "subject",    null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "investment_types", force: :cascade do |t|
    t.string "name"
  end

  create_table "settings", force: :cascade do |t|
    t.string   "key"
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string  "username"
    t.boolean "logged_in"
  end

end
