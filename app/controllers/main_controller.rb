class MainController < ApplicationController

  def home
    render 'home'
  end

  def dashboard
    render 'dashboard'
  end

  def search
    render 'search'
  end

  def property
    render 'property'
  end
end
