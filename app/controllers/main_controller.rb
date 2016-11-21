class MainController < ApplicationController
  def home
    render 'home'
  end

  def dashboard
    render 'dashboard'
  end

  def getLocale
    render json: Setting.first[:Locale]
  end
end
