class AnswersController < ApplicationController
	respond_to :json
  before_filter :authenticate_user!
  before_filter :set_own_games
  before_filter :set_game
  before_filter :set_question

  def create
    @answer = @question.answers.new(answer_params)
    @answer.user_id = current_user.id
    if @answer.save
      render :json => {:info => "answer created", :answer => @answer}, :status => 200
    else
      render :json => {:info => "error at create", :answer => @answer.error}, :status => 500
    end
  end

  private

  def set_own_games
    @games = Game.includes(:users).where('users.id' => current_user.id)
  end

  def set_game
  	@game = @games.find(params[:game_id])
  end

  def set_question
    @question = @game.questions.find(params[:question_id])
  end

  def answer_params
    params.require(:answer).permit(:answer)
  end
end
