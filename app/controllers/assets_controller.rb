class AssetsController < ApplicationController
  def show
    assets = Asset.all
    render json: assets
  end

  # def parsed_assets
  #   types = InvestmentType.all.as_json
  #   assets = { owned_assets: [], watched_assets: [] }
  #   types.each do |type|
  #     type['assets'] = Asset.all.where(investment_type: type['name'], user_owned: true).as_json
  #   end
  #   render json: assets
  # end

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
    render json: Asset.all.where(user_watched: true).as_json
  end

  def add_to_watchlist
    begin
      asset = Asset.find(params[:asset_id])
      asset.update(user_watched: true, user_owned: false)
      render json: { status: 200 }
    rescue => e
      render json: { error: e.message }
    end
  end
end
