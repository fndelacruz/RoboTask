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
    day = params[:dateTime][0..2].upcase
    interval = params[:dateTime][16..17]

    if interval == "00"
      @users = User.includes(:work_times)
        .where('work_times.day = ?', day)
        .references(:work_times)
    else
      @users = User.includes(:work_times)
        .where('work_times.interval = ?', WORKTIME.INTERVAL_CODE[interval])
        .where('work_times.day = ?', day)
        .references(:work_times)
    end

    # # NOTE: this fetches ALL worker users. ultimately, want to change this to only the
    # # ones owning a particular work_time
    # @users = User.joins(:work_times)
    #   .group("users.id")
    #   .having("(count(user_id)) > 0")

    render json: @users
  end
end
