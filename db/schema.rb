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
    t.string   "name_heb"
    t.string   "address"
    t.float    "total",                       default: 0.0
    t.string   "description"
    t.string   "market_type"
    t.string   "investment_type"
    t.string   "property_type"
    t.string   "rating"
    t.float    "price"
    t.float    "income"
    t.float    "yield"
    t.integer  "established"
    t.string   "quality"
    t.float    "ltv"
    t.string   "gps"
    t.string   "market"
    t.string   "location"
    t.string   "tenants_financial_stability"
    t.string   "tenants_macro_stability"
    t.string   "lease_contracts_length"
    t.string   "contracts_securities"
    t.string   "development_phase"
    t.string   "occupancy_rate"
    t.string   "market_occupancy_rate"
    t.boolean  "user_owned"
    t.boolean  "user_watched"
    t.float    "value"
    t.float    "debt"
    t.float    "gains"
    t.string   "image"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
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
