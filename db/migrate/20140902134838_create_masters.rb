class CreateMasters < ActiveRecord::Migration
  def change
    create_table :masters do |t|
      t.string "name"
      t.string "feature1"
      t.string "feature2"
      t.float  "value1"
      t.float  "value2"
      t.integer  :user_id
    end
  end
end
