Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

root 'main#home'

get '/carousel_assets', to: 'assets#show'
get '/robots.txt', to: 'application#robots'
get '/dashboard', to: 'main#dashboard'

end
