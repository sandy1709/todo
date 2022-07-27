class CheckedtodoController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # def update old todo
    def updatecheckTodo
        oldtodo =  params[:tid]
        newtodo = params[:oldchecked]
        reqtodo = Todo.find_by(tid: oldtodo)
        reqtodo.update(checked: newtodo == "true" ? "false" : "true")
        render :json => reqtodo
    end
end