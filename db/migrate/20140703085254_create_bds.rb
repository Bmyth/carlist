class CreateBds < ActiveRecord::Migration
  def change
    create_table :bds do |t|
      t.string "number"
      t.string "applicantName"
      t.string "applicantId"
      t.string "applicantPhone"
      t.string "bdType"
      t.date "startDate"
      t.date "endDate"
      t.string "worker"
      t.string "master"
      t.boolean "workerChecked"
      t.boolean "masterChecked"
      t.float "feeA"
      t.float "rateAin"
      t.float "rateAout"
      t.float "feeB"
      t.float "rateBin"
      t.float "rateBout"
      t.text "otherInfo"
      t.integer  :user_id
      t.datetime 'created_at'
      t.datetime 'updated_at'
    end
  end
end
