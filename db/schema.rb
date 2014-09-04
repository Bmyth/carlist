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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140902134845) do

  create_table "bds", :force => true do |t|
    t.string   "number"
    t.string   "applicantName"
    t.string   "applicantId"
    t.string   "applicantPhone"
    t.string   "bdType"
    t.date     "startDate"
    t.date     "endDate"
    t.string   "worker"
    t.string   "master"
    t.boolean  "workerChecked"
    t.boolean  "masterChecked"
    t.float    "feeA"
    t.float    "rateAin"
    t.float    "rateAout"
    t.float    "feeB"
    t.float    "rateBin"
    t.float    "rateBout"
    t.text     "otherInfo"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "fillDate"
    t.string   "plate"
  end

  create_table "masters", :force => true do |t|
    t.string  "name"
    t.string  "feature1"
    t.string  "feature2"
    t.float   "value1"
    t.float   "value2"
    t.integer "user_id"
  end

  create_table "users", :force => true do |t|
    t.string "name"
    t.string "password"
    t.text   "info1"
    t.text   "info2"
    t.text   "info3"
    t.text   "info4"
    t.date   "expiryDate"
  end

  create_table "workers", :force => true do |t|
    t.string  "name"
    t.string  "feature1"
    t.string  "feature2"
    t.float   "value1"
    t.float   "value2"
    t.integer "user_id"
  end

end
