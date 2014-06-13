class QuestionsController < ApplicationController
	respond_to :json
  before_filter :authenticate_user!
  before_filter :set_own_games
  before_filter :set_game

  def index
  	@questions = @game.questions
  end

  def show
    @question = @game.get_question(params)
    if @question.nil?
      render :json => {:info => "QAPI not available"}, :status => 500
    elsif @question == 'finished'
      render :json => {:info => "finished"}, :status => 500
    else
      render 'show'
    end
  end

  def create
    @question = Question.create(question_params)
    if @question.valid?
      render 'Question created'
    else
      render :json => {:info => "question created error", :error => @question.error}, :status => 500
    end
  end

  def update
    @question.update(question_params)
    render :json => {:info => "question updated", :game => @question}, :status => 200
  end

  def destroy
    @question.destroy
    render :json => {:info => "question destroyed"}, :status => 200
  end

  private

  def set_own_games
    @games = Game.includes(:users).where('users.id' => current_user.id)
  end

  def set_game
  	@game = @games.find(params[:game_id])
  end

  def question_params
    params.require(:question).permit(:question, :answer, :game_id)
  end
end
