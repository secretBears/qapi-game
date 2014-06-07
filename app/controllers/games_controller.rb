class GamesController < ApplicationController
	respond_to :json
  before_filter :authenticate_user!
  before_filter :set_own_games
  before_filter :set_games, except: [:index]

  def index
  end

  def show
  end

  def create
    @game = Game.create(game_params)
    if @game.valid?
      render 'show'
    else
      render :json => {:info => "game created error", :error => @game.error}, :status => 500
    end
  end

  def update
    @game.update(game_params)
    render :json => {:info => "game updated", :game => @game}, :status => 200
  end

  def destroy
    @game.destroy
    render :json => {:info => "game destroyed"}, :status => 200
  end

  private

  def set_own_games
    @games = Game.includes(:users).where('users.id' => current_user.id)
  end

  def set_games
  	@game = @games.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:finish)
  end
end
