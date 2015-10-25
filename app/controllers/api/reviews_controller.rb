class Api::ReviewsController < ApplicationController
  def index
    worker_id = review_params[:worker_id]
    # I think I also need to join the creators table to this..., otherwise
    # creator.email fires more queries
    @reviews = Review.includes(:task).where(tasks: { worker_id: worker_id })
  end

  def create
    if current_user.id != review_params[:creator_id].to_i
      render json: { status: "BAD" }
    else


      review = Review.new(review_params.select{ |k,_| k != "creator_id" })
      if review.save
        render json: {status: "OK"}
      else
        render json: {status: "BAD"}
      end
    end
  end

  private

  def review_params
    params.require(:review).permit(:worker_id, :task_id, :description, :is_positive, :creator_id)
  end
end
