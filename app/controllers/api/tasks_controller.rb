class Api::TasksController < ApplicationController
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
