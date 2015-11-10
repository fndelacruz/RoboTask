class Api::TasksController < ApplicationController
  def index
    @tasks = Task.includes(:review).includes(:worker)
    if current_user.is_robot
      @tasks = @tasks.where(worker: current_user)
    else
      @tasks = @tasks.where(creator: current_user)
    end
  end

  def create
    task = Task.new(task_params)
    task.creator = current_user
    datetime_arr = task_params["datetime"].split
    date = datetime_arr[0].split("/")
    datetime = DateTime.new(date[2].to_i, date[0].to_i, date[1].to_i, datetime_arr[1].to_i)
    task.datetime = datetime

    if task.is_open == false
      task.wage = task.worker.wage
      if task.save
        render json: {
          id: task.id,
          title: task.title,
          description: task.description,
          lat: task.lat,
          lng: task.lng,
          location: task.location,
          created_at: task.created_at.strftime('%m/%d/%Y'),
          is_complete: false,
          is_open: false,
          wage: task.wage
        }
      else
        render json: { _fail: true }
      end
    else
      # NOTE: I expect task.wage to be defined by this point by user at creation
      if task.save
        render json: {
          id: task.id,
          title: task.title,
          description: task.description,
          lat: task.lat,
          lng: task.lng,
          location: task.location,
          created_at: task.created_at.strftime('%m/%d/%Y'),
          is_complete: false,
          is_open: true,
          wage: task.wage
        }
      else
        render json: { _fail: true }
      end
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
    params.require(:task).permit(:title, :location, :description, :worker_id, :datetime, :lat, :lng, :is_open, :wage)
  end
end
