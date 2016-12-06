Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
root 'main#index'

resources :translations, only: :show

get '/home', to: 'main#home'
get '/dashboard', to: 'main#dashboard'
get '/search', to: 'main#search'
get '/property', to: 'main#property'

get '/carousel_assets', to: 'assets#show'
get '/parsed_owned_assets', to: 'assets#parsed_owned_assets'
get '/parsed_watched_assets', to: 'assets#parsed_watched_assets'
get '/robots.txt', to: 'application#robots'
get '/dashboard', to: 'main#dashboard'

post '/asset_remove_from_watchlist', to: 'assets#remove_from_watchlist'
post '/asset_add_to_watchlist', to: 'assets#add_to_watchlist'
end
