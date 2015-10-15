class Api::UsersController < ApplicationController
  # NOTE: this controller is really only to fetchValidWorkers, so I won't
  # consider fetching non-user works on this Api. If it comes to it, I will
  # split the index, ex:
  # if user_type == "workers"
  #   @users = User.workers # where time slices are within
  #   render json: @users
  # elsif user_type == "creators" # I might not use this type...
  #   fail
  # else
  #   fail
  # end

  def index
    # @users = User.includes(:work_times)
    #   .where('work_times.interval = ?', 'MORNING')
    #   .where('work_times.day = ?', 'SUN')
    #   .references(:work_times)

    # NOTE: this fetches ALL worker users. ultimately, want to change this to only the
    # ones owning a particular work_time
    @users = User.joins(:work_times)
      .group("users.id")
      .having("(count(user_id)) > 0")

    render json: @users
  end
end
