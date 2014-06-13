class Answer < ActiveRecord::Base
	belongs_to :user
	belongs_to :question

	def self.of_question_and_user(question, user)
		Answer.where(:user_id => user.id).where(:question_id => question.id).first
	end

	def self.of_question_execpt_user(question, user)
		Answer.where(:question_id => question.id).where.not(:user_id => user.id)
	end
end
