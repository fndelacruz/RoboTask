class Api::Workers::TasksController < ApplicationController
  def index
    # NOTE: THIS WILL BE USED TO FILTER TASK BY LAT AND LNG
    #   real_bench_params = params["bench"]
    # # debugger;
    # south_west_lat = real_bench_params["bounds"]["southWest"]["lat"].to_f
    # north_east_lat = real_bench_params["bounds"]["northEast"]["lat"].to_f
    # south_west_lng = real_bench_params["bounds"]["southWest"]["lng"].to_f
    # north_east_lng = real_bench_params["bounds"]["northEast"]["lng"].to_f
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
