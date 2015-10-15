class Api::UsersController < ApplicationController
  def index
    user_type = params["user_type"]

    # if user_type == "workers"
    #   @users = User.workers # where time slices are within
    #   render json: @users
    # elsif user_type == "creators" # I might not use this type...
    #   fail
    # else
    #   fail
    # end
  end
end
