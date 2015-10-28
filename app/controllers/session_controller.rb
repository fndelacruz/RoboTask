class SessionController < ApplicationController
  before_action :require_no_login!, only: [:new, :create]
  before_action :require_current_user!, only: :destroy

  def new
  end

  def create
    @user = User.find_by_credentials(
      session_params[:email], session_params[:password]
    )
    if @user
      login(@user)
      # flash[:notices] ||= []
      # flash[:notices] << "Login OK"
      redirect_to "/"
    else
      flash.now[:errors] ||= []
      flash.now[:errors] << "We don't recognize your email address or password. Please try again."
      render :new
    end
  end

  def destroy
    logout
    # Note: obj is created to trigger ajax success callback
    obj = User.new
    # flash[:notices] ||= []
    # flash[:notices] << "Logout OK"
    render json: obj
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
