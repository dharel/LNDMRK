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

    def test
    render 'test'
  end
end
