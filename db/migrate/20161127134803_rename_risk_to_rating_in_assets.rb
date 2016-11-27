class RenameRiskToRatingInAssets < ActiveRecord::Migration[5.0]
  def change
    rename_column :assets, :risk, :rating
  end
end
