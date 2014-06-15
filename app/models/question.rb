class Question < ActiveRecord::Base
	belongs_to :game
	has_many :answers
	has_many :qapi_answers

	def right_answer
		qapi_answers.where(:is_true => "true").first
	end

	def answer_of_user(user)
		answer = Answer.of_question_and_user(self, user)
		if answer.nil?
			return nil
		end
		answer.answer
	end

	def is_right?(user)
		answer_of_user(user).to_s == right_answer.answer.to_s
	end

	def other_users_answers(user)
		Answer.of_question_execpt_user(self, user)
	end
end
