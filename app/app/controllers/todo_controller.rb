class TodoController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # To return all todos
    def getallTodos
        todoList = Todo.all
        render :json => todoList
    end
end