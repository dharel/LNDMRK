class AssetsController < ApplicationController
  def show
    assets = Asset.all
    data = assets.map(&:short_data)
    render json: data
  end
end
