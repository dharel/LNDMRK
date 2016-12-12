class MainController < ApplicationController
  def mobile?
    (request.user_agent.try(:downcase) =~ /mobile|ip(hone|od|ad)|android|blackberry|iemobile|kindle|netfront|silk-accelerated|(hpw|web)os|fennec|minimo|opera m(obi|ini)|blazer|dolfin|dolphin|skyfire|zune/) && !(request.user_agent.try(:downcase) =~ /ipad|kindle|silk/)
  end

  def home
    if mobile?
      render 'mobile/home'
    else
      render 'home'
    end
  end

  def dashboard
    if mobile?
      render 'mobile/dashboard'
    else
      render 'dashboard'
    end
  end

  def search
    if mobile?
      render 'mobile/search'
    else
      render 'search'
    end
  end

  def property
    if mobile?
      render 'mobile/property'
    else
      render 'property'
    end
  end
end
