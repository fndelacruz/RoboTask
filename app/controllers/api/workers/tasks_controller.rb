class Api::Workers::TasksController < ApplicationController
  def index
    unassigned_tasks = Task.includes(:creator).where("worker_id IS NULL")
    @workable_tasks = current_user.workable_tasks(unassigned_tasks)
    if params["bounds"]
      @workable_tasks.select! { |task| task.in_bounds?(params["bounds"])}
    end
  end

  def update
    task = Task.find(params[:id])
    task.worker = current_user
    if task.save
      render json: {status: "success"}
    else
      render json: {status: "error"}
    end
  end

  private

  def task_params
    params.require(:task).permit(:id)
  end
end
