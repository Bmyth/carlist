class AddFillDateToBds < ActiveRecord::Migration
  def change
    add_column :bds, :fillDate, :date
  end
end
