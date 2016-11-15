class CreateAssets < ActiveRecord::Migration[5.0]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :investment_type
      t.string :risk
      t.integer :price
      t.integer :income
      t.integer :yeild
      t.string :image
      t.timestamps
    end
  end
end
