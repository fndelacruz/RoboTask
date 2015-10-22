class Api::Workers::TasksController < ApplicationController
  def index
    unassigned_tasks = Task.includes(:creator).where("worker_id IS NOT NULL")
    @workable_tasks = current_user.workable_tasks(unassigned_tasks)
    # render json:
  end
end
