class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery
  before_filter :test_func

  private

  def test_func
    puts form_authenticity_token
  end
  
end
