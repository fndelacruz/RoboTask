class UsersController < ApplicationController
  before_action :require_no_login!, only: [:new, :create]
  before_action :require_current_user!, only: :show

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      flash[:notices] ||= []
      flash[:notices] << "User creation OK"
      redirect_to "/"
    else
      flash.now[:errors] ||= []
      flash.now[:errors].concat(@user.errors.full_messages)
      render :new
    end
  end

  def show
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
