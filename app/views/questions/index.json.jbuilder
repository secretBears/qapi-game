
json.array! (@questions) do |question|
	json.id question.id
	json.question question.question
	json.answer question.answer_of_user(current_user)
	json.rightAnswer question.right_answer.answer
	json.isRight question.is_right?(current_user)
	json.otherUsersAnswers do 
		json.array! question.other_users_answers(current_user) do |otherAnswer|
			json.user otherAnswer.user.email
			json.answer otherAnswer.answer
			json.isRight question.is_right?(otherAnswer.user)
		end
	end
	json.createdAt question.created_at
	json.updatedAt question.updated_at
end
