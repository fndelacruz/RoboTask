class Api::Workers::WorkedTasksController < ApplicationController
  def index
    @worked_tasks = Task.where(worker: current_user)
  end
end
