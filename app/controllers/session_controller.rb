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
      flash[:notices] ||= []
      flash[:notices] << "Login OK"
      redirect_to user_url(@user)
    else
      flash.now[:errors] ||= []
      flash.now[:errors] << "Invalid credentials"
      render :new
    end
  end

  def destroy
    logout
    flash[:notices] ||= []
    flash[:notices] << "Logout OK"
    redirect_to new_session_url
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
