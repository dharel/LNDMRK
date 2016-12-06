class CreateAssets < ActiveRecord::Migration[5.0]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :investment_type
      t.float :price, default: 0
      t.float :value, default: 0
      t.float :yield, default: 0
      t.string :rating
      t.float :income, default: 0
      t.float :debt, default: 0
      t.float :gains, default: 0
      t.string :image
      t.string :address
      t.string :market_type
      t.string :property_type
      t.string :gps
      t.boolean :user_owned, default: true
      t.boolean :user_watched, default: false
      t.timestamps
    end
  end
end
