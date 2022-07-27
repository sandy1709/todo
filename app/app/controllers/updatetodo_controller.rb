class UpdatetodoController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # def update old todo
    def updateTodo
        oldtodo =  params[:tid]
        newtodo =  params[:new]
        reqtodo = Todo.find_by(tid: oldtodo)
        reqtodo.update(text:newtodo)
        render :json => reqtodo
    end
end