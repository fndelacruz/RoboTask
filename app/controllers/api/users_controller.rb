class Api::UsersController < ApplicationController
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
  end

  def show
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
    render json: {
      bio: current_user.bio,
      work_times: work_times_hash
    }
  end

  def update
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
  
end
