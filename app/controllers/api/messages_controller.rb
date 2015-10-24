class Api::MessagesController < ApplicationController
  def index
    @messages = current_user.messages.includes(:task)
  end

end
