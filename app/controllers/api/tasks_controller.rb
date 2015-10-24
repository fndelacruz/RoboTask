class Api::TasksController < ApplicationController
  def index
    @created_tasks = Task.includes(:review).includes(:worker)
      .where(creator_id: current_user.id)
  end

  def create
    task = Task.new(task_params)
    task.creator = current_user
    if task.save
      render json: {
        id: task.id,
        title: task.title,
        description: task.description,
        lat: task.lat,
        lng: task.lng,
        location: task.location,
        created_at: task.created_at.strftime('%m/%d/%Y'),
        is_complete: false
      }
    else
      render json: { _fail: true }
    end
  end

  # NOTE: update is used for the assignment of a worker to a task
  def update
    # NOTE: this conditional ensures current_user owns the task being assigned
    # a worker
    if current_user.created_tasks.map { |task| task.id }.include?(params[:id].to_i)
      @task = Task.find(params[:id])
      @task[:worker_id] = task_params["worker_id"]
      datetime_arr = task_params["datetime"].split
      date = datetime_arr[0].split("/")
      datetime = DateTime.new(date[2].to_i, date[0].to_i, date[1].to_i, datetime_arr[1].to_i)
      @task[:datetime] = datetime
      if @task.save
        current_user.send_message("AUTO-NOTIFICATION: I hired you for this task!", @task)
        render json: @task
      else
        render json: { _fail: true }
      end
    else
      render json: { _fail: true }
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if @task.creator = current_user
      @task.destroy
      render json: { status: "OK" }
    else
      render json: { status: "BAD" }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :location, :description, :worker_id, :datetime, :lat, :lng)
  end
end
