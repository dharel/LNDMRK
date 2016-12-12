class CreateAssets < ActiveRecord::Migration[5.0]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :name_heb
      t.string :address
      t.float :total, default: '0'
      t.string :description
      t.string :market_type
      t.string :investment_type
      t.string :property_type
      t.string :rating
      t.float :price
      t.float :income
      t.float :yield
      t.integer :established
      t.string :quality
      t.float :ltv
      t.string :gps
      t.string :market
      t.string :location
      t.string :tenants_financial_stability
      t.string :tenants_macro_stability
      t.string :lease_contracts_length
      t.string :contracts_securities
      t.string :development_phase
      t.string :occupancy_rate
      t.string :market_occupancy_rate
      t.boolean :user_owned
      t.boolean :user_watched
      t.float :value
      t.float :debt
      t.float :gains
      t.string :image
      t.text  :banner_images, array: true, default: []
      t.timestamps
    end
  end
end
