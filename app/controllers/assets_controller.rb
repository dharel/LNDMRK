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

  def parsed_owned_assets
    types = InvestmentType.all.as_json

    types.each do |type|
      type['assets'] = Asset.all.where(investment_type: type['name'], user_owned: true).as_json
    end
    render json: types
  end

  def parsed_watched_assets
    watched_assets = Asset.all.where(user_watched: true).as_json

    render json: watched_assets
  end

  def remove_from_watchlist
    asset = Asset.find(params[:asset_id])
    asset.update(user_watched: false)

    watched_assets = Asset.all.where(user_watched: true).as_json
    render json: watched_assets
  end
end
