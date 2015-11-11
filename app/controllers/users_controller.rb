class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    [@user.fname, @user.lname].each { |name| name.capitalize! }
    if @user.save
      login(@user)
      redirect_to root_url
    else
      flash[:create_account_errors] ||= []
      flash[:create_account_errors].concat(@user.errors.full_messages)
      redirect_to root_url(user: user_params.reject { |k,_| k == "password" })
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :is_robot)
  end
end
