class Api::ReviewsController < ApplicationController
  def index
    worker_id = review_params[:worker_id]
    @reviews = Review.includes(:task).where(tasks: { worker_id: worker_id })
    render json: @reviews
  end

  private

  def review_params
    params.require(:review).permit(:worker_id)
  end
end
