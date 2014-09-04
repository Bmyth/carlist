class AddPlateToBds < ActiveRecord::Migration
  def change
    add_column :bds, :plate, :string
  end
end
