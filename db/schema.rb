# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151023200247) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.integer  "owner_id",                    null: false
    t.integer  "sender_id",                   null: false
    t.integer  "receiver_id",                 null: false
    t.integer  "task_id",                     null: false
    t.text     "message",                     null: false
    t.boolean  "is_read",     default: false, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "task_id",     null: false
    t.boolean  "is_positive", null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description", null: false
    t.string   "location",    null: false
    t.integer  "creator_id",  null: false
    t.integer  "worker_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.datetime "datetime"
    t.float    "lat",         null: false
    t.float    "lng",         null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.text     "bio"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "fname",           null: false
    t.string   "lname",           null: false
  end

  create_table "work_times", force: :cascade do |t|
    t.string   "day",        null: false
    t.string   "interval",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
