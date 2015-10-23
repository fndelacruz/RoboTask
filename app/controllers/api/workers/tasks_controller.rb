class Api::Workers::TasksController < ApplicationController
  def index
    # debugger
    # NOTE: THIS WILL BE USED TO FILTER TASK BY LAT AND LNG
    # debugger

    if params["taskParams"].nil?
      render json: {}
    else
      bounds = params["taskParams"]["bounds"]
      # # debugger;
      south_west_lat = bounds["southWest"]["lat"].to_f
      north_east_lat = bounds["northEast"]["lat"].to_f
      south_west_lng = bounds["southWest"]["lng"].to_f
      north_east_lng = bounds["northEast"]["lng"].to_f
      # min_seating = real_bench_params["min_seating"].to_i
      # max_seating = real_bench_params["max_seating"].to_i
      #
      # @benches = Bench.where(lat: south_west_lat..north_east_lat).where(lng: south_west_lng..north_east_lng).where(seating: min_seating..max_seating)

      unassigned_tasks = Task.includes(:creator).where("worker_id IS NOT NULL")
      @workable_tasks = current_user.workable_tasks(unassigned_tasks)
      # debugger
      # render json:
    end
  end
end
