Rails.application.routes.draw do

  root 'main#index'

  scope 'api', format: 'json' do

    devise_for :users, path_names: { sign_in: "login", sign_out: "logout" }

    devise_scope :user do
      match '/sessions' => 'devise/sessions#create', :via => :post
      match '/sessions' => 'sessions#destroy', :via => :delete
      # match '/sessions' => 'sessions#options', :via => :options
    end
    match '/users/current' => 'users#current', :via => :get

    resources :users, format: 'json'
    resources :games, format: 'json' do
      resources :questions, format: 'json' do
        resources :answers, format: 'json'
      end
    end

  end
  
  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
