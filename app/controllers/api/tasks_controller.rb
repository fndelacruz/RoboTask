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

  def update
    # if current_user actually owns the task, THEN do the following...
    if current_user.created_tasks.map { |task| task.id }.include?(params[:id].to_i)
      puts "This user does own the task he wants to update!"
      @task = Task.find(params[:id])
      @task["worker_id"] = task_params["worker_id"]
      @task.save

      render json: @task
    else
      render json: { _fail: true }
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(:title, :location, :description, :worker_id)
  end
end
