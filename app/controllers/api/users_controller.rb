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
  end

  def update
    case params[:field]
    when "bio"
      current_user.bio = params[:user]
      render json: { status: current_user.save ? "success" : "error" }
    when "workTimes"
      ActiveRecord::Base.transaction do
        WorkTime.delete_all(["user_id = ?", current_user.id])
        work_times_payload = []
        params[:user].each do |day, intervals|
          intervals.each do |interval, status|
            if status == "true"
              work_times_payload.push({ day: day, interval: interval })
            end
          end
        end

        if current_user.work_times.create(work_times_payload)
          render json: {status: "success"}
        else
          render json: {status: "error"}
        end
      end
    when "wage"
      current_user.wage = params[:user]
      render json: current_user.save ?  {status: "success"} : {status: "error"}
    end


  end

  private

end
