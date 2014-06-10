class Question < ActiveRecord::Base
	belongs_to :game
	has_many :answers

	def is_right?(user)
		a = Answer.of_question_and_user(self, user)
		answer == a.answer
	end
end
