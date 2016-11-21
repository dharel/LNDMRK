class TranslationsController < ApplicationController
  def show
    @locale = params[:id].to_sym
    
    @translations = I18n.with_locale(@locale) do
      I18n.backend.send(:translations)[@locale]
    end
    render json: @translations
  end
end
