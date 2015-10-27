class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :require_no_login!, :require_current_user!

  private
  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def require_no_login!
    if current_user
      # flash[:errors] ||= []
      # flash[:errors] << "Page intended for non-logged in users. You're already signed in!"
      redirect_to "/"
    end
  end

  def require_current_user!
    unless current_user
      # flash[:errors] ||= []
      # flash[:errors] << "Page intended for logged in users. Please sign in!"
      redirect_to new_session_url
    end
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_login
    redirect_to new_session_url unless current_user
  end

end
