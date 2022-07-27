Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/todos", to: "todo#getallTodos"
  post "/add", to: "addtodo#addNewTodo"
  post "/del", to: "deltodo#delTodo"
  post "/update", to: "updatetodo#updateTodo"
  post "/check", to: "checkedtodo#updatecheckTodo"
  # Defines the root path route ("/")
  # root "articles#index"
end
