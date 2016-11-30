class CreateInvestmentType < ActiveRecord::Migration[5.0]
  def change
    create_table :investment_types do |t|
      t.string :name
    end
  end
end
