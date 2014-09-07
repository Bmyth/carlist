class AddCatalogToBds < ActiveRecord::Migration
  def change
    add_column :bds, :catalog, :string
    add_column :bds, :bdSubType, :string
  end
end
