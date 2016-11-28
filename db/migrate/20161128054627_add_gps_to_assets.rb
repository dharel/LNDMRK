class AddGpsToAssets < ActiveRecord::Migration[5.0]
  def change
    add_column :assets, :gps, :string
  end
end
