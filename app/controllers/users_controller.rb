class UsersController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :except => [:create]
  before_action :set_user, only: [:show]

  def index
    @users = User.all
    render 'index'
  end

  def show
  end

  def create
    @user = User.create(user_params)
    if @user.valid?
      sign_in(@user)
      render 'show'
    else
      render :json => {:info => "user created error", :error => @user.error}, :status => 500
    end
  end

  def update
    User.update(current_user.id, user_params)
    @user = current_user
    render 'show'
  end

  def destroy
    User.find(current_user.id).destroy
    render :json => {:info => "user destroyed"}, :status => 200
  end

  def current
    @user = current_user
    render 'show'
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end