class Api::ReviewsController < ApplicationController
  def index
    worker_id = review_params[:worker_id]
    # I think I also need to join the creators table to this..., otherwise
    # creator.email fires more queries
    reviews = Review.includes(:task).where(tasks: { worker_id: worker_id })
    #
    reviews_formatted = [];
    reviews.each do |review|
      reviews_formatted.push({
        id: review.id,
        datetime: review.task.datetime.strftime('%m/%d/%Y'),
        isGood: review.is_positive,
        description: review.description,
        reviewer: review.task.creator.email
      })
    end

    render json: reviews_formatted
  end

  private

  def review_params
    params.require(:review).permit(:worker_id)
  end
end
