class DeltodoController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # to delete todo
    def delTodo
        todel = params[:tid]
        result = Todo.destroy_by(tid: todel)
        render :json => result
    end
end