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
      redirect_to root_url
    else
      flash[:login_errors] ||= []
      flash[:login_errors] << "We don't recognize your email address or password. Please try again."
      redirect_to root_url(session: session_params["email"])
    end
  end

  def destroy
    logout
    obj = User.new
    render json: obj
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
