##################################################################################
#
# This is just a demo controller, that will help you at the initial setup.
# Once you are ready for real developemt, Please remove it an implament your own controllers.
#
##################################################################################
class MainController < ApplicationController

  before_filter toggleLocale

  def home
    render 'home'
  end

  def dashboard
    render 'dashboard'
  end

  def toggleLocale
    puts params
    I18n.locale = params[:locale] || I18n.default_lcoale
  end
end
