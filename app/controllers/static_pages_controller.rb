class StaticPagesController < ApplicationController
  before_action :require_current_user!

  def root
    render :root
  end
end
