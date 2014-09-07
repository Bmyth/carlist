class AddCarInfoToBds < ActiveRecord::Migration
  def change
    add_column :bds, :carInfo1, :string
    add_column :bds, :carInfo2, :string
    add_column :bds, :carInfo3, :string
    add_column :bds, :carInfo4, :string
  end
end
