class Api::TasksController < ApplicationController
  def index
    # NOTE: OLDER fetch. now, need to include email
    # @created_tasks = current_user.created_tasks
    # render json: @created_tasks

    created_tasks_formatted = [];
    created_tasks = Task.includes(:review).includes(:worker)
      .where(creator_id: current_user.id)

    # reviews = Review.includes(:task).where(tasks: { worker_id: worker_id })

    created_tasks.each do |task|
      task_formatted = {
        id: task.id,
        title: task.title,
        description: task.description,
        location: task.location,
        created_at: task.created_at.strftime('%m/%d/%Y')
      }

      if task.worker != nil
        task_formatted[:worker_shortname] = "#{task.worker.fname} #{task.worker.lname[0]}."
        task_formatted[:worker_id] = task.worker.id
      end

      if task.review != nil
        task_formatted[:review] = {}
        task_formatted[:review][:description] = task.review.description
        task_formatted[:review][:is_positive] = task.review.is_positive
        task_formatted[:review][:datetime] = task.review.created_at.strftime('%m/%d/%Y')
        task_formatted[:is_complete] = true
      else
        task_formatted[:is_complete] = false
      end
      created_tasks_formatted.push(task_formatted)
    end

    render json: created_tasks_formatted
  end

  def create
    task = Task.new(task_params)
    task.creator = current_user
    if task.save
      render json: {
        id: task.id,
        title: task.title,
        description: task.description,
        location: task.location,
        created_at: task.created_at.strftime('%m/%d/%Y'),
        is_complete: false
      }
    else
      render json: { _fail: true }
    end
  end

  def update
    # NOTE: this conditional ensures current_user owns the task being assigned
    # a worker. is this necessary...?
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
    if @task.creator = current_user
      @task.destroy
      render json: { status: "OK" }
    else
      render json: { status: "BAD" }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :location, :description, :worker_id)
  end
end
