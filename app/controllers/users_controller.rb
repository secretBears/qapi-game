class UsersController < ApplicationController
  before_filter :authenticate_user!, :except => [:create]
  before_action :set_user, only: [:show]

  def index
    #render :json => :user => current_user, :status => 200
    render 'index'
  end

  def show
    render :json => {:info => "Show User", :user => @user}, :status => 200
  end

  def create
    @user = User.create(user_params)
    if @user.valid?
      sign_in(@user)
      render :json => {:info => "user created", :user => @user}, :status => 200
      #respond_with @user, :location => users_path
    else
      render :json => {:info => "user created error", :error => @user.error}, :status => 500
      #respond_with @user.errors, :location => users_path
    end
  end

  def update
    #respond_with 
    User.update(current_user.id, user_params)
    render :json => {:info => "user updated", :user => current_user}, :status => 200
  end

  def destroy
    #respond_with 
    User.find(current_user.id).destroy
    render :json => {:info => "user destroyed"}, :status => 200
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end