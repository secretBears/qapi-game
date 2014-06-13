class Question < ActiveRecord::Base
	belongs_to :game
	has_many :answers

	def is_right?(user)
		a = Answer.of_question_and_user(self, user)
		answer.to_s == a.answer.to_s
	end

	def other_users_answers(user)
		Answer.of_question_execpt_user(self, user)
	end
end
