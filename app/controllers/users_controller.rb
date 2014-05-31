class UsersController < ApplicationController
  before_filter :authenticate_user!, :except => [:create]
  before_action :set_user, only: [:show]

  def index
    render :json => {:info => "Current User", :user => current_user}, :status => 200
  end

  def show
    render :json => {:info => "Show User", :user => @user}, :status => 200
  end

  def create
    @user = User.create(user_params)
    if @user.valid?
      sign_in(@user)
      respond_with @user, :location => users_path
    else
      respond_with @user.errors, :location => users_path
    end
  end

  def update
    #respond_with 
    User.update(current_user.id, user_params)
  end

  def destroy
    #respond_with 
    User.find(current_user.id).destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end