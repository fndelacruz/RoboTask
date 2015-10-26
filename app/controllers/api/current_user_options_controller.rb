class Api::CurrentUserOptionsController < ApplicationController
  def index
  end

  def update
    if current_user.valid_password?(current_user_params[:current_password])
      current_user.password = current_user_params[:new_password]
      current_user.save!
      render json: {status: "success", message: "Password updated!" }
    else
      render json: {status: "error", message: "Incorrect old password."}
    end
  end

  private

  def current_user_params
    params.require(:user).permit(:current_password, :new_password)
  end
end
