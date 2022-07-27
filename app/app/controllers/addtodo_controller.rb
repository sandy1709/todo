class AddtodoController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # To add new Todo
    def addNewTodo
        todoItem = {
                "text" => params[:text],
                "tid" => params[:tid],
                "checked" => params[:checked],
                }
        newtodo = Todo.new(todoItem)
        newtodo.save
        render :json => newtodo
    end
end