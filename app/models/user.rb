class User < ActiveRecord::Base
  has_and_belongs_to_many :games
  has_many :answers
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def games
  	Game.includes(:users).where('users.id' => id)
  end

  def num_of_games_won
    count = 0
    games.each do |game|
      if is_winner?(game)
        count += 1
      end
    end
    count
  end

  def is_winner?(game)
    winners = game.winners
    winners.count == 1 && winners.first.id == id
  end

  def sum_of_right_and_wrong_answers
  	right = 0
  	wrong = 0
  	games.each do |game|
  		result = game.result(self)
  		right += result[:right]
  		wrong += result[:wrong]
  	end
  	{:right => right, :wrong => wrong}
  end
end
