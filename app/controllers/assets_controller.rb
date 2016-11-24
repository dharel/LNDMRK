class AssetsController < ApplicationController
  def show
    assets = Asset.all
    render json: assets
  end

  def parsed_assets
    types = InvestmentType.all.as_json
    
    types.each do |type|
      type['assets'] = Asset.all.where(investment_type: type['name']).as_json
    end
    
    render json: types
  end
end
