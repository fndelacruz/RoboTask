class UsersController < ApplicationController
  before_action :require_no_login!, only: [:new, :create]
  before_action :require_current_user!, only: :show

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    @user.fname = @user.fname.capitalize
    @user.lname = @user.lname.capitalize
    if @user.save
      login(@user)
      redirect_to root_url
    else
      flash[:create_account_errors] ||= []
      flash[:create_account_errors].concat(@user.errors.full_messages)
      redirect_to root_url(user: user_params.reject { |k,_| k == "password" })
    end
  end

  def show
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :is_robot)
  end

end
