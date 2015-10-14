class Api::TasksController < ApplicationController
  def index
    @created_tasks = current_user.created_tasks
    render json: @created_tasks
  end

  def create
    @task = Task.new(task_params)
    @task.creator = current_user
    if @task.save
      render json: @task
    else
      render json: { _fail: true }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :location, :description)
  end
end
