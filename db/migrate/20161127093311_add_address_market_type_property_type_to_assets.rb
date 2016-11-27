class AddAddressMarketTypePropertyTypeToAssets < ActiveRecord::Migration[5.0]
  def change
    add_column :assets, :address, :string
    add_column :assets, :market_type, :string
    add_column :assets, :property_type, :string
  end
end
