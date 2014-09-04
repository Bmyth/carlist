class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :info1, :text
    add_column :users, :info2, :text
    add_column :users, :info3, :text
    add_column :users, :info4, :text
    add_column :users, :expiryDate, :date
  end
end
