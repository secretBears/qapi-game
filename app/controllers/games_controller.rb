class GamesController < ApplicationController
	respond_to :json
  before_filter :authenticate_user!
  before_filter :set_own_games
  before_filter :set_game, except: [:index, :create]

  def index
  end

  def show
  end

  def create
    @game = Game.new(game_params)
    @game.users << current_user
    if @game.save
      render 'show'
    else
      render :json => {:info => "game created error", :error => @game.error}, :status => 500
    end
  end

  def update
    if !game_params[:userEmail].nil? && !game_params[:add].nil? && !@game.started
      if !@game.update_player(game_params)
        render :json => {:error => "Email does not exist"}, :status => 500
        return
      end
    else
      if game_params[:started]
        @game.start()
      end
      @game.update(game_params)
    end
    render 'show'
  end

  def destroy
    @game.destroy
    render :json => {:info => "game destroyed"}, :status => 200
  end

  private

  def set_own_games
    @games = Game.includes(:users).where('users.id' => current_user.id)
  end

  def set_game
  	@game = @games.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:finish, :started, :userEmail, :add)
  end
end
