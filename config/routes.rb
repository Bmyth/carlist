Myapp::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/login' => 'nexus#login', :via => :post
  match '/logout' => 'nexus#logout', :via => :get
  match '/console' => 'nexus#console', :via => :get
  match '/setting' => 'nexus#setting', :via => :get

  match '/addBD' => 'nexus#addBD', :via => :post
  match '/updateBD/:id' => 'nexus#updateBD', :via => :post
  match '/getBD' => 'nexus#getBD', :via => :get
  match '/deleteBD' => 'nexus#deleteBD', :via => :post

  match '/masterCheck' => 'nexus#masterCheck', :via => :post
  match '/masterUncheck' => 'nexus#masterUncheck', :via => :post
  match '/workerCheck' => 'nexus#workerCheck', :via => :post
  match '/workerUncheck' => 'nexus#workerUncheck', :via => :post

  match '/warden' => 'warden#index', :via => :get
  match '/wardenlogin' => 'warden#login', :via => :post

  match 'addUser' => 'warden#addUser', :via => :post
  match 'deleteUser' => 'warden#deleteUser', :via => :post
  match 'updateUser' => 'warden#updateUser', :via => :post
end
