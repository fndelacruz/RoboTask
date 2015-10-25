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
    interval = params[:dateTime][16..17].to_i

    if interval == 0
      @workers = User.includes(:work_times)
        .where('work_times.day = ?', day)
        .references(:work_times)
    else
      @workers = User.includes(:work_times)
        .where('work_times.interval = ?', WorkTime.interval_code(interval))
        .where('work_times.day = ?', day)
        .references(:work_times)
    end

    # NOTE: this fetches ALL worker users. don't use it anymore but might be
    # useful later
    # @users = User.joins(:work_times)
    #   .group("users.id")
    #   .having("(count(user_id)) > 0")
  end

  def show

    # # NOTE: only using show to show current_user. seems kind of hacky, in
    # # particular because I do this by setting "id" to 1
    # work_times = []
    # current_user.work_times.each do |work_time|
    #   work_times.push({ day: work_time.day , interval: work_time.interval })
    # end
    #

    work_times_hash = {};

    current_user.work_times.each do |work_time|
      work_times_hash[work_time.day] ||= {}
      work_times_hash[work_time.day][work_time.interval] = true
    end

    WorkTime.days.each do |day|
      work_times_hash[day] = {} if !work_times_hash[day]
      WorkTime.intervals.each do |interval|
        work_times_hash[day][interval] ||= false
      end
    end

    # debugger

    render json: {
      bio: current_user.bio,
      work_times: work_times_hash
    }
  end

  def update
    # NOTE: I think this should be done in a transaction. not sure how to use
    # though. actually, can just check if current_user.save succeeds, right?

    work_times = params[:user][:workTimes]

    saveStatus = true
    ActiveRecord::Base.transaction do
      current_user.bio = params[:user][:bio]
      saveStatus = current_user.save! ? true : false

      WorkTime.delete_all(["user_id = ?", current_user.id])

      work_times_payload = []
      work_times.each do |day, intervals|
        intervals.each do |interval, status|
          if status == "true"
            work_times_payload.push({
              day: day,
              interval: interval
            })
          end
        end
      end

      saveStatus = current_user.work_times.create!(work_times_payload) && saveStatus
    end

    if saveStatus
      render json: {status: "OK"}
    else
      render json: {status: "BAD"}
    end
  end

  private

  # NOTE: Couldn't get workTimes to be  a permitted parameter. something about
  # nested hashes not playing well with the regular permitting

  # def user_params
  #   params.require(:user).permit(:bio, workTimes: [])
  # end

end
