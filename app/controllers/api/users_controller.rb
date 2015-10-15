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
        .where('work_times.interval = ?', WorkTime.interval_code(interval))
        .where('work_times.day = ?', day)
        .references(:work_times)
    end

    # NOTE: this fetches ALL worker users. don't use it anymore but might be
    # useful later
    # @users = User.joins(:work_times)
    #   .group("users.id")
    #   .having("(count(user_id)) > 0")

    render json: @users
  end

  def show
    # NOTE: only using show to show current_user. seems kind of hacky, in
    # particular because I do this by setting "id" to 1
    work_times = []
    current_user.work_times.each do |work_time|
      work_times.push({ day: work_time.day , interval: work_time.interval })
    end

    render json: {
      bio: current_user.bio,
      work_times: work_times
    }

  end

  def update
    current_user.bio = user_params["bio"]
    if current_user.save
      render json: {status: "OK"}
    else
      render json: {status: "BAD"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:bio)
  end

end
