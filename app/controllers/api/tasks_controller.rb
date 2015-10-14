class Api::TasksController < ApplicationController
  def create
    debugger
    @task = Task.new
    render json: "something, likely the Task created.."
  end

  private

  def task_params

  end
end
