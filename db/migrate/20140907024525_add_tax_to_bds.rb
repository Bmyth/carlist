class AddTaxToBds < ActiveRecord::Migration
  def change
    add_column :bds, :tax, :float
    add_column :bds, :applicantInfo1, :string
    add_column :bds, :applicantInfo2, :string
    add_column :bds, :carInfo, :text
  end
end
rake